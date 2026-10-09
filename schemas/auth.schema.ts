import z from "zod"

export const LoginZodSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character."
    ),
})

export type LoginFormValues = z.infer<typeof LoginZodSchema>

export const RegistrationZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(20, "Name must not exceed 20 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least 1 number.")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character."
    ),
})

export const VerificationZodSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 characters."),
})

export type RegisterFormValues = z.infer<typeof RegistrationZodSchema>
export type VerificationFormValues = z.infer<typeof VerificationZodSchema>
