"use server";
import { createUser } from "@/utils/data/user";
import { hashUserPassword, verifyPassword } from "@/utils/hash";
import { redirect } from "next/navigation";
import { createAuthSession, destroySession } from "@/lib/lucia/auth";
import { generateIdFromEntropySize } from "lucia";

import { User } from "@/lib/models/user.model";
import { createEmailVerificationToken } from "@/utils/tokens";
import { sendVerificationEmail } from "@/utils/mails";
import { SignUpSchema, SignInSchema } from "@/schemas/zSchemas";

export async function signup(prevState: unknown, formData: FormData) {
  const validateData = SignUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    userName: formData.get("username") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { email, password, userName } = validateData.data;

  const hashedPassword = hashUserPassword(password);
  try {
    const _id = generateIdFromEntropySize(24);
    await createUser({
      _id,
      email,
      password: hashedPassword,
      userName,
      role: "CLIENT",
    });

    const verificationToken = await createEmailVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      userName
    );
    redirect(`/auth/verify-email-send?id=${_id}`);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return { errors: ["Email already exists"] };
    }
    throw error;
  }
}

export async function login(prevState: unknown, formData: FormData) {
  const validateData = SignInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { email, password } = validateData.data;

  const existingUser = await User.findOne({ email });

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { errors: ["User not found"] };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await createEmailVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      existingUser.userName
    );

    redirect(`/auth/verify-email-send?id=${existingUser._id}`);
  }
  const isValid = verifyPassword(existingUser.password, password);
  if (!isValid) {
    return { errors: ["Invalid password"] };
  }
  await createAuthSession(existingUser._id);
  redirect("/dashboard/profile");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
