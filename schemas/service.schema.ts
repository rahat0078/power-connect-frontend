import { z } from "zod"

export const createPowerServiceZodSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be a positive number"),
  capacity: z.string().min(1, "Capacity is required"),
})

export const updatePowerServiceZodSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number").optional(),
  capacity: z.string().optional(),
})

export type CreateServiceFormValues = z.infer<typeof createPowerServiceZodSchema>
export type UpdateServiceFormValues = z.infer<typeof updatePowerServiceZodSchema>