import { z } from "zod";
export const SignUpSchema = z.object({
  email: z
    .string({ required_error: "Email required" })
    .email({ message: "Invalid email address" }),
  userName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
// New Password Schema
export const NewPasswordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, {
      message: "Old password is required",
    }),
    password: z.string().min(8, {
      message: "Minimum 8 characters required",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
export const ProfileDetailsSchema = z.object({
  fullName: z.string(),
  bio: z.string(),
  avatar: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png formats are allowed."
    ),
});

export const MeasurementSchema = z.object({
  date: z.string().date(),
  weight: z.number().positive(),
  chest: z.number().positive(),
  waist: z.number().positive(),
  leftCalf: z.number().positive(),
  rightCalf: z.number().positive(),
  leftThigh: z.number().positive(),
  rightThigh: z.number().positive(),
  buttocks: z.number().positive(),
  leftBiceps: z.number().positive(),
  rightBiceps: z.number().positive(),
});
