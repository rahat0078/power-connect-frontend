'use server'

import { fetcher } from "@/lib/fetcher"
import { cookies } from "next/headers"

export interface OutageReport {
  id: string
  area: string
  description: string
  status: string
  createdAt: string
  resolvedAt?: string | null
}

export const getMyOutageReports = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<OutageReport[]>("/outage-reports/my-reports", {
    headers: {
      Cookie: cookieString,
    },
    cache: "no-store",
  })
}


export const createOutageReport = async (data: {
  area: string
  description: string
}) => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<OutageReport>("/outage-reports", {
    method: "POST",
    headers: {
      "Cookie": cookieString,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}
