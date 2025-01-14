"use server";
import { createUser } from "@/libs/user";
import { hashUserPassword } from "@/util/hash";
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
  const data = await createUser({ email, password, userName, role: "user" });
  console.log(data);
  //   const response = await fetch("/api/auth/signup", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   return data;re
}
