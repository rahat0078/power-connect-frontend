import { getMe } from "@/app/(public)/_actions/getMe"
import { getProviderProfile } from "../_actions/provider-profile"
import ProviderProfileClient from "./profile-client"

export default async function ProviderProfilePage() {
  const [user, profileRes] = await Promise.all([
    getMe(),
    getProviderProfile(),
  ])

  return (
    <ProviderProfileClient
      user={user}
      profile={profileRes.data}
    />
  )
}