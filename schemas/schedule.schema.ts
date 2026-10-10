import { z } from "zod"

export const createScheduleZodSchema = z
  .object({
    area: z
      .string({ required_error: "Area is required" })
      .min(2, "Area must be at least 2 characters"),
    startTime: z
      .string({ required_error: "Start time is required" })
      .min(1, "Start time is required"),
    endTime: z
      .string({ required_error: "End time is required" })
      .min(1, "End time is required"),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(data.startTime)
      const end = new Date(data.endTime)
      return end > start
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )

export type CreateScheduleFormValues = z.infer<typeof createScheduleZodSchema>