import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { google } from "@/lib/oauth/oauthProvieders";
import mongoose from "mongoose";
import { OAuthAccount, IoAuthAccount } from "@/lib/models/oAuthProvider";
import { User } from "@/lib/models/user.model";
import { luciaAuth } from "@/lib/lucia/lucia";
import { generateIdFromEntropySize } from "lucia";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  picture: string;
  locale: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      return new Response("Invalid request", { status: 400 });
    }

    const codeVerifier = (await cookies()).get("codeVerifier")?.value;
    const savedState = (await cookies()).get("state")?.value;

    if (!codeVerifier || !savedState) {
      return new Response("Code verifier or saved state is not exists", {
        status: 400,
      });
    }

    if (savedState !== state) {
      return Response.json(
        {
          error: "State does not match",
        },
        {
          status: 400,
        }
      );
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const accessToken = tokens.accessToken();

    let refreshToken = null;
    try {
      refreshToken = tokens.refreshToken();
    } catch (e) {
      console.log("No refresh token", e);
    }

    const accessTokenExpiresAt = tokens.accessTokenExpiresAt();

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      }
    );

    const googleData = (await googleRes.json()) as GoogleUser;
    const mongoSession = await mongoose.startSession();
    let userForSession = null;

    try {
      mongoSession.startTransaction();
      const user = await User.findOne({ email: googleData.email }, null, {
        session: mongoSession,
      });

      if (!user) {
        const createdUser = await User.create(
          [
            {
              _id: generateIdFromEntropySize(24),
              email: googleData.email,
              userName: googleData.name,
              emailVerified: true,
              role: "user",
            },
          ],

          { session: mongoSession }
        );

        userForSession = createdUser[0]._id;
        const oauthAccountData: IoAuthAccount = {
          userId: createdUser[0]._id,
          email: googleData.email,
          provider: "google",
          providerUserId: googleData.id,
          accessToken,
          refreshToken,
          expires_at: accessTokenExpiresAt,
        };

        await OAuthAccount.create([oauthAccountData], {
          session: mongoSession,
        });
      } else {
        userForSession = user._id;
        user.name = googleData.name;
        user.profilePictureUrl = googleData.picture;
        await user.save({ session: mongoSession });

        const existingOAuthAccount = await OAuthAccount.findOne(
          { userId: user._id, provider: "google" },
          null,
          { session: mongoSession }
        );
        if (!existingOAuthAccount) {
          const oauthAccountData: IoAuthAccount = {
            userId: user._id,
            email: googleData.email,
            provider: "google",
            providerUserId: googleData.id,
            accessToken,
            refreshToken,
            expires_at: accessTokenExpiresAt,
          };
          await OAuthAccount.create([oauthAccountData], {
            session: mongoSession,
          });
        } else {
          await OAuthAccount.updateOne(
            { userId: user._id, provider: "google" },
            {
              $set: {
                accessToken,
                refreshToken,
                expires_at: accessTokenExpiresAt,
              },
            },
            { session: mongoSession }
          );
        }
      }

      await mongoSession.commitTransaction();

      const session = await luciaAuth.createSession(userForSession, {});

      const sessionCookie = luciaAuth.createSessionCookie(session.id);

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );

      (await cookies()).set("state", "", {
        expires: new Date(0),
      });

      (await cookies()).set("codeVerifier", "", {
        expires: new Date(0),
      });

      return NextResponse.redirect(
        new URL("/profile", process.env.NEXT_BASE_URL),
        {
          status: 302,
        }
      );
    } catch (err) {
      console.log(err);
      await mongoSession.abortTransaction();

      throw err;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
};
