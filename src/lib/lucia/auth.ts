// auth/lucia.ts

import { Lucia, TimeSpan } from "lucia";

import { adapter } from "../mongodb/adapter";
import { cookies } from "next/headers";
import connectMongoDb from "../mongodb/mogodb";

await connectMongoDb();
export interface DatabaseUserAttributes {
  userName: string;
  email: string;
  email_verified: boolean;
}

export const luciaAuth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(5, "d"),
  sessionCookie: {
    expires: false,

    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      userName: attributes.userName,
      email: attributes.email,
      email_verified: attributes.email_verified,
    };
  },
});
declare module "lucia" {
  interface Register {
    Lucia: typeof luciaAuth;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
export async function createAuthSession(userId: string) {
  const session = await luciaAuth.createSession(userId, {});

  const sessionCookie = luciaAuth.createSessionCookie(session.id);

  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function verifyAuth() {
  const sessionCookie = (await cookies()).get(luciaAuth.sessionCookieName);

  if (!sessionCookie) {
    return { user: null, session: null };
  }
  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return { user: null, session: null };
  }

  const result = await luciaAuth.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = luciaAuth.createSessionCookie(result.session.id);

      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = luciaAuth.createBlankSessionCookie();
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: "Unautorized",
    };
  }
  luciaAuth.invalidateSession(session.id);
  const sessionCookie = luciaAuth.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
