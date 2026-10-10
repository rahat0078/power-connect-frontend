"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"

export interface IPendingProvider {
  id: string
  userId: string
  businessName: string
  phone: string
  address: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  user: {
    name: string
    email: string
    emailVerified: boolean
    role: string
  }
}

export const getPendingProviders = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPendingProvider[]>("/providers/pending", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}

export const approveProviderProfile = async (id: string) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPendingProvider>(`/providers/approve/${id}`, {
    method: "PATCH",
    headers: { Cookie: cookieString },
  })
}

export const rejectProviderProfile = async (id: string) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPendingProvider>(`/providers/reject/${id}`, {
    method: "PATCH",
    headers: { Cookie: cookieString },
  })
}