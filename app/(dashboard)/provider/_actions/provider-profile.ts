import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"

export interface IProviderProfile {
  id: string
  businessName: string
  phone: string
  address: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    role: string
    emailVerified: boolean
  }
}

export const getProviderProfile = async () => {
  const cookieStore = await cookies()
  const cookieString = cookieStore.toString()

  return await fetcher<IProviderProfile>("/providers/me", {
    headers: { Cookie: cookieString },
    cache: "no-store",
  })
}