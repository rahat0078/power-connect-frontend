"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { CreateServiceRequestInput } from "@/schemas/serviceRequest"

export const createServiceRequest = async (payload: CreateServiceRequestInput) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher("/service-requests", {
    method: "POST",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}