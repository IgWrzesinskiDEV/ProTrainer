"use server";

import { cookies } from "next/headers";
import { luciaAuth } from "./lucia";
import { cache } from "react";

export interface verifiedUserData {
  user: {
    id: string;
    email: string;
    userName: string;
  };
}

export interface verifiedSessionData {
  session: {
    id: string;
    userId: string;
    fresh: boolean;
    expiresAt: Date;
  };
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

export const verifyAuth = cache(async function verifyAuth() {
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
});

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
