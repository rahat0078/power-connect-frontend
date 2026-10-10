"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"

export type RequestStatus = 
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"

export interface IServiceRequest {
  id: string
  serviceId: string
  residentId: string
  status: RequestStatus
  address?: string
  scheduledDate?: string
  createdAt: string
  updatedAt: string
  service: {
    name: string
    price: string
    capacity: string
  }
  resident: {
    name: string
    email: string
    phone?: string
  }
}

// 1. Get All Provider Requests
export const getProviderServiceRequests = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IServiceRequest[]>("/service-requests/provider-requests", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}

// 2. Update Status (ACCEPT / CANCEL / IN_PROGRESS)
export const updateServiceRequestStatus = async (
  id: string,
  status: Extract<RequestStatus, "ACCEPTED" | "CANCELLED" | "IN_PROGRESS">
) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IServiceRequest>(`/service-requests/status/${id}`, {
    method: "PATCH",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
}

// 3. Mark Service Request as Completed
export const completeServiceRequest = async (id: string) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IServiceRequest>(`/service-requests/complete/${id}`, {
    method: "PATCH",
    headers: { Cookie: cookieString },
  })
}