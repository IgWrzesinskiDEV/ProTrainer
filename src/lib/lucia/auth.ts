// auth/lucia.ts
import { Lucia, TimeSpan } from "lucia";

import { adapter } from "../adapter";
import { cookies } from "next/headers";

const luciaAuth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(5, "d"),
  sessionCookie: {
    expires: false,

    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof luciaAuth;
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
  console.log(sessionId, "sessionCookie");
  const result = await luciaAuth.validateSession(sessionId);
  console.log(result, "result");
  //const user = await luciaAuth.getUser(result.user.userId);
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
