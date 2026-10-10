import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import PaymentsClientPage from "./payment-client"

export interface PaymentHistoryItem {
  id: string
  userId: string
  serviceRequestId: string
  amount: string
  transactionId: string
  paymentMethod: string
  status: "PAID" | "PENDING" | "FAILED"
  createdAt: string
  serviceRequest: {
    id: string
    address: string
    scheduledAt: string
    status: string
    service: {
      name: string
      capacity: string
    }
    provider: {
      businessName: string
      phone: string
    }
  }
}

async function getPaymentHistory() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()

    const res = await fetcher<PaymentHistoryItem[]>("/payments/my-history", {
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

export default async function ResidentPaymentsPage() {
  const payments = await getPaymentHistory()

  return <PaymentsClientPage initialPayments={payments} />
}