"use server";

import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";
import { google } from "@/lib/oauth/oauthProvieders";
export const createGoogleAuthorizationURL = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    (await cookies()).set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    (await cookies()).set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    const scopes = ["email", "profile"];
    const authorizationURL = google.createAuthorizationURL(
      state,
      codeVerifier,
      scopes
    );

    return {
      success: true,
      data: authorizationURL.toString(),
    };
  } catch (error: unknown) {
    return {
      error: (error as Error).message,
    };
  }
};
