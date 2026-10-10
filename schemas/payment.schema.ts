import { z } from "zod"

export const createCheckoutZodSchema = z.object({
  serviceRequestId: z.string().uuid("Invalid service request ID"),
})

export type CreateCheckoutInput = z.infer<typeof createCheckoutZodSchema>