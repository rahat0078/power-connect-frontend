/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers"
import { fetcher } from "@/lib/fetcher"
import ResidentDashboardClient from "./resident-dashboard-client"
import BecomeProviderBanner from "./become-provider-banner"

async function getDashboardStats() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()

    const [requestsRes, outagesRes, paymentsRes] = await Promise.all([
      fetcher<any[]>("/service-requests/my-requests", {
        headers: { Cookie: cookieString },
        cache: "no-store",
      }),
      fetcher<any[]>("/outage-reports/my-reports", {
        headers: { Cookie: cookieString },
        cache: "no-store",
      }),
      fetcher<any[]>("/payments/my-history", {
        headers: { Cookie: cookieString },
        cache: "no-store",
      }),
    ])

    const requests = requestsRes.data || []
    const outages = outagesRes.data || []
    const payments = paymentsRes.data || []

    return {
      totalRequests: requests.length,
      pendingRequests: requests.filter((r) => r.status === "PENDING").length,
      acceptedRequests: requests.filter((r) => r.status === "ACCEPTED").length,
      totalOutages: outages.length,
      totalPayments: payments.length,
    }
  } catch {
    return {
      totalRequests: 0,
      pendingRequests: 0,
      acceptedRequests: 0,
      totalOutages: 0,
      totalPayments: 0,
    }
  }
}

export default async function ResidentPage() {
  const stats = await getDashboardStats()

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <BecomeProviderBanner />
      <div>
        <ResidentDashboardClient stats={stats} />
      </div>
    </div>
  )
}
