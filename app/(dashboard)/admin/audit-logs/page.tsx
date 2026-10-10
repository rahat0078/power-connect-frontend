import { getMe } from "@/app/(public)/_actions/getMe"
import { getAuditLogs } from "../_actions/admin-audit-logs"
import AuditLogsClient from "./audit-logs-client"


export default async function AdminAuditLogsPage() {
  const [user, auditLogsRes] = await Promise.all([
    getMe(),
    getAuditLogs(),
  ])

  return (
    <AuditLogsClient
      user={user}
      initialLogs={auditLogsRes.data || []}
    />
  )
}