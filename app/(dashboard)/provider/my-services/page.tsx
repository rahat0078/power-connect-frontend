import { getMe } from "@/app/(public)/_actions/getMe"
import { getMyServices } from "../_actions/service"
import MyServicesClient from "./my-services-client"


export default async function MyServicesPage() {
  const [user, servicesRes] = await Promise.all([
    getMe(),
    getMyServices(),
  ])

  return (
    <MyServicesClient
      user={user}
      initialServices={servicesRes.data || []}
    />
  )
}