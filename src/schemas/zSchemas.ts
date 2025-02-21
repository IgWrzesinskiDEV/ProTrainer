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

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
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

export const TrainerAdditionalDataSchema = z.object({
  trainerDetails: z
    .array(z.string().min(1, { message: "Delete empty fields" }))
    .min(1, { message: "At least one element required" }),
});

export type TrainerSocialMediaSchemaType = z.infer<
  typeof TrainerSocialMediaSchema
>;

export const TrainerSocialMediaSchema = z
  .object({
    experience: z.string().max(300, { message: "Max 300 characters" }),
    specialization: z.string(),
    instagram: z.string().url("Invalid instagram URL").or(z.literal("")),
    facebook: z.string().url("Invalid facebook URL").or(z.literal("")),
    whatsapp: z.string().url("Invalid whatsapp URL").or(z.literal("")),
    onSite: z.boolean(),
    online: z.boolean(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((value) => {
        return (
          (typeof value === "string" && value.trim().length > 0) ||
          value === true ||
          false
        );
      });
    },
    {
      message: "At least one field must be filled.",
      path: [], // This will apply to the entire object, not just a specific field
    }
  );

export const NewEmptyPlanSchema = z.object({
  planName: z.string().min(1, { message: "Plan name is required" }),
});

export const AddExercisesSchema = z.object({
  exercises: z.array(
    z.object({
      exerciseName: z.string().min(1, { message: "Exercise name is required" }),
      tempo: z.string().min(1, { message: "Tempo is required" }),
    })
  ),
});

export const AddWeekDataSchema = z.object({
  weekData: z.array(
    z.object({
      weekNumber: z.number().positive(),
      trainerData: z.string().min(1, { message: "Trainer data is required" }),
    })
  ),
});
