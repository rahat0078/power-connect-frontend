
import { getMe } from "@/app/(public)/_actions/getMe"
import AdminDashboardClient from "./dashboard-client"
import { getDashboardStats } from "./_actions/admin-stats"
import { PageHeader } from "@/components/shared/page-header"

export default async function AdminDashboardPage() {
  const [user, statsRes] = await Promise.all([
    getMe(),
    getDashboardStats(),
  ])

  return ( <>
  <PageHeader
        title="Admin Dashboard"
        description="Monitor utility operations and manage your PowerConnect workspace."
      />
    <AdminDashboardClient
      user={user}
      stats={statsRes.data}
    />
  </>
  )
}
