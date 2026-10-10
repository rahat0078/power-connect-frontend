'use server'

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import { StatusType } from "./admin-outage-constants"



export interface OutageReport {
  id: string
  area: string
  description: string
  status: StatusType
  createdAt: string
  user: {
    name: string
    email: string
  }
}

export const getAllPlatformOutageReports = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<OutageReport[]>("/outage-reports", {
    headers: {
      Cookie: cookieString,
    },
    cache: "no-store",
  })
}

export const updateOutageStatus = async (id: string, status: StatusType) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher(`/outage-reports/${id}/status`, {
    method: "PATCH",
    headers: {
      Cookie: cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
}