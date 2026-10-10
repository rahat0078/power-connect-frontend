import { z } from "zod"

export const createServiceRequestZodSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  address: z.string().min(3, "Address must be at least 3 characters"),
  scheduledAt: z.string().min(1, "Scheduled date and time is required"),
})

export type CreateServiceRequestInput = z.infer<typeof createServiceRequestZodSchema>