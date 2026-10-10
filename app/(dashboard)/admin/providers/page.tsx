import { getMe } from "@/app/(public)/_actions/getMe"
import { getPendingProviders } from "../_actions/admin-provider-approval"
import AdminProvidersClient from "./providers-client"


export default async function AdminProvidersApprovalPage() {
  const [user, pendingProvidersRes] = await Promise.all([
    getMe(),
    getPendingProviders(),
  ])

  return (
    <AdminProvidersClient
      user={user}
      initialPendingProviders={pendingProvidersRes.data || []}
    />
  )
}