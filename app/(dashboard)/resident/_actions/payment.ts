"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { CreateCheckoutInput } from "@/schemas/payment.schema"

export const createCheckoutSession = async (payload: CreateCheckoutInput) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher("/payments/create-checkout", {
    method: "POST",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
}