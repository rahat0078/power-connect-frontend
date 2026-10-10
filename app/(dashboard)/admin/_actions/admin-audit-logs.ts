"use server"

import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"

export interface IAuditLog {
  id: string
  userId: string
  action: string
  entity: string
  entityId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export const getAuditLogs = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IAuditLog[]>("/admin/audit-logs", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}