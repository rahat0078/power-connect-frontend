
import { getMe } from "@/app/(public)/_actions/getMe"
import ResidentReportsClient from "./reports-client"
import { getMyOutageReports } from "../_actions/outage"

export default async function ResidentReportsPage() {
  const [user, initialReportsRes] = await Promise.all([
    getMe(),
    getMyOutageReports(),
  ])

  return (
    <ResidentReportsClient
      user={user}
      initialReports={initialReportsRes.data || []}
    />
  )
}