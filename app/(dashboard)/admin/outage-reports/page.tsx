import { getMe } from "@/app/(public)/_actions/getMe"
import { getAllPlatformOutageReports } from "../_actions/admin-outage"
import AdminOutageReportsClient from "./reports-client"


export default async function AdminOutageReportsPage() {
  const [user, initialReportsRes] = await Promise.all([
    getMe(),
    getAllPlatformOutageReports(),
  ])

  return (
    <AdminOutageReportsClient
      user={user}
      initialReports={initialReportsRes.data || []}
    />
  )
}