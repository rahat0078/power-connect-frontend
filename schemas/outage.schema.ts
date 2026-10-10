import { z } from "zod"

export const createOutageReportZodSchema = z.object({
  area: z.string().min(2, "Area must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
})

export type OutageFormValues = z.infer<typeof createOutageReportZodSchema>