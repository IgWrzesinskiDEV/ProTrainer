"use server";
import { createUser } from "@/lib/user";
import { hashUserPassword } from "@/util/hash";
import { redirect } from "next/navigation";
import { createAuthSession } from "@/lib/lucia/auth";

interface errors {
  email: string;
  password: string;
  userName: string;
}
export async function signup(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const unHashedpassword = formData.get("password") as string;
  const userName = formData.get("username") as string;
  const errors = {} as errors;
  if (userName.trim().length === 0) {
    errors.userName = "Username is required";
  }
  if (!email || !email.includes("@")) {
    errors.email = "Invalid email";
  }
  if (!unHashedpassword.trim() || unHashedpassword.trim().length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  console.log(errors);
  const password = hashUserPassword(unHashedpassword);
  try {
    const data = await createUser({ email, password, userName, role: "user" });
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await createAuthSession(data._id.toString(), expiresAt);
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

  redirect("/login");
}
