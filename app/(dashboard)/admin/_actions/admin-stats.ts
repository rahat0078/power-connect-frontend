"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"

export interface IDashboardStats {
  totalUsers: number
  totalServices: number
  totalRequests: number
  totalRevenue: string
}

export const getDashboardStats = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IDashboardStats>("/admin/dashboard-stats", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}