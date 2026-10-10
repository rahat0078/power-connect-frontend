"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { CreateProviderApplyFormValues } from "@/schemas/provider-apply.schema"

export const applyForProvider = async (data: CreateProviderApplyFormValues) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher("/providers/apply", {
    method: "POST",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}