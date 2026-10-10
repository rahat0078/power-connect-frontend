import { z } from "zod"

export const createProviderProfileZodSchema = z.object({
  businessName: z
    .string({ required_error: "Business name is required" })
    .min(2, "Business name must be at least 2 characters long"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^(?:\+88|88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address must be at least 5 characters long"),
})

export type CreateProviderApplyFormValues = z.infer<typeof createProviderProfileZodSchema>