import { getMe } from "@/app/(public)/_actions/getMe"
import { getPowerSchedules } from "../_actions/admin-schedule"
import AdminSchedulesClient from "./schedules-client"


export default async function AdminSchedulesPage() {
  const [user, schedulesRes] = await Promise.all([
    getMe(),
    getPowerSchedules(),
  ])

  return (
    <AdminSchedulesClient
      user={user}
      initialSchedules={schedulesRes.data || []}
    />
  )
}