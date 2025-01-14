// auth/lucia.ts
import { lucia } from "lucia";

import { adapter } from "../adapter";
import { cookies } from "next/headers";

const luciaAuth = lucia({
  adapter: adapter,
  env: "DEV", // "PROD" if deployed to HTTPS

  sessionCookie: {
    expires: false,
  },
});

export async function createAuthSession(userId: string, expiresAt: Date) {
  console.log(typeof userId, "userId");
  const session = await luciaAuth.createSession({
    userId,

    attributes: { expiresAt },
  });
  const sessionCookie = luciaAuth.createSessionCookie(session.id);
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
