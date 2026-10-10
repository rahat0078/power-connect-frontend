import { getMe } from "../_actions/getMe"
import HowItWorksClient from "./how-it-works-client"


export default async function HowItWorksPage() {
  const user = await getMe()

  return <HowItWorksClient user={user} />
}