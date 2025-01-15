"use server";
import { createUser } from "@/lib/user";
import { hashUserPassword, verifyPassword } from "@/util/hash";
import { redirect } from "next/navigation";
import { createAuthSession, destroySession } from "@/lib/lucia/auth";
import { generateIdFromEntropySize } from "lucia";
import { User } from "@/lib/models/user.model";

interface errors {
  email: string;
  password: string;
  userName: string;
}
export async function signup(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userName = formData.get("username") as string;
  const errors = {} as errors;
  if (userName.trim().length === 0) {
    errors.userName = "Username is required";
  }
  if (!email || !email.includes("@")) {
    errors.email = "Invalid email";
  }
  if (!password.trim() || password.trim().length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const data = await createUser({
      _id: generateIdFromEntropySize(24),
      email,
      password: hashedPassword,
      userName,
      role: "user",
    });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await createAuthSession(data._id.toString());
    redirect("/profile");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      return { errors: { email: "Email already exists" } };
    }
    throw error;
  }
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const existingUser = await User.findOne({ email });

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { errors: { email: "User not found" } };
  }
  const isValid = verifyPassword(existingUser.password, password);
  if (!isValid) {
    return { errors: { password: "Invalid password" } };
  }
  await createAuthSession(existingUser._id);
  redirect("/profile");
}

export async function logout() {
  await destroySession();
  redirect("/");
}
