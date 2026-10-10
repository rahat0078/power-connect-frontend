"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { CreateServiceFormValues, UpdateServiceFormValues } from "@/schemas/service.schema"

export interface IPowerService {
  id: string
  providerId: string
  name: string
  description: string
  price: string
  capacity: string
  status: "ACTIVE" | "INACTIVE"
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export const getMyServices = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerService[]>("/services/my-services", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}

export const createPowerService = async (data: CreateServiceFormValues) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher("/services", {
    method: "POST",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export const updatePowerService = async (id: string, data: UpdateServiceFormValues) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerService>(`/services/${id}`, {
    method: "PATCH",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

export const updateServiceStatus = async (id: string, status: "ACTIVE" | "INACTIVE") => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerService>(`/services/status/${id}`, {
    method: "PATCH",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
}

export const deletePowerService = async (id: string) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IPowerService>(`/services/${id}`, {
    method: "DELETE",
    headers: { Cookie: cookieString },
  })
}