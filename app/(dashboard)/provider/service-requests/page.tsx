import { getMe } from "@/app/(public)/_actions/getMe"
import { getProviderServiceRequests } from "../_actions/provider-service-request"
import ProviderRequestsClient from "./request-client-component"


export default async function ProviderRequestsPage() {
  const [user, requestsRes] = await Promise.all([
    getMe(),
    getProviderServiceRequests(),
  ])

  return (
    <ProviderRequestsClient
      user={user}
      initialRequests={requestsRes.data || []}
    />
  )
}