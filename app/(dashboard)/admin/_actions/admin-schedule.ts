"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { CreateScheduleFormValues } from "@/schemas/schedule.schema"

export interface IPowerSchedule {
  id: string
  area: string
  startTime: string
  endTime: string
  description?: string
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  createdById: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export const getPowerSchedules = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerSchedule[]>("/schedule", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}

export const createPowerSchedule = async (data: CreateScheduleFormValues) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  const payload = {
    ...data,
    startTime: new Date(data.startTime).toISOString(),
    endTime: new Date(data.endTime).toISOString(),
  }

  return await fetcher<IPowerSchedule>("/schedule", {
    method: "POST",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

export const updatePowerSchedule = async (
  id: string,
  data: Partial<CreateScheduleFormValues> & { status?: IPowerSchedule["status"] }
) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = { ...data }
  if (data.startTime) payload.startTime = new Date(data.startTime).toISOString()
  if (data.endTime) payload.endTime = new Date(data.endTime).toISOString()

  return await fetcher<IPowerSchedule>(`/schedule/${id}`, {
    method: "PATCH",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}

export const deletePowerSchedule = async (id: string) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerSchedule>(`/schedule/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookieString },
  })
}