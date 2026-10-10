import { getMe } from "@/app/(public)/_actions/getMe"
import CreateServiceClient from "./create-service-client"


export default async function CreateServicePage() {
  const user = await getMe()

  return <CreateServiceClient user={user} />
}