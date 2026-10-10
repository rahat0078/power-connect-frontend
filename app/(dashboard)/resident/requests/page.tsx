import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import RequestsClientPage from "./request-client"

export interface ServiceRequest {
  id: string
  userId: string
  serviceId: string
  providerId: string
  address: string
  scheduledAt: string
  status: "PENDING" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  totalAmount: string
  createdAt: string
  updatedAt: string
  service: {
    id: string
    name: string
    description: string
    price: string
    capacity: string
    status: string
  }
  provider: {
    id: string
    businessName: string
    phone: string
    address: string
    user: {
      name: string
      email: string
    }
  }
  payment: {
    id: string
    status: string
    transactionId?: string
  } | null
}

async function getMyServiceRequests() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()

    const res = await fetcher<ServiceRequest[]>("/service-requests/my-requests", {
      headers: {
        Cookie: cookieString,
      },
      cache: "no-store",
    })

    return res.data || []
  } catch {
    return []
  }
}

export default async function ResidentRequestsPage() {
  const requests = await getMyServiceRequests()

  return <RequestsClientPage initialRequests={requests} />
}