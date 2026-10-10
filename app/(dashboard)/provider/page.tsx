/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers"
import Link from "next/link"
import { fetcher } from "@/lib/fetcher"
import { PageHeader } from "@/components/shared/page-header"
import {
  PlusCircle,
  Wrench,
  Clock,
  CheckCircle2,
  ArrowRight,
  Boxes,
} from "lucide-react"

async function getProviderStats() {
  try {
    const cookieStore = await cookies()
    const cookieString = cookieStore.toString()

    const [servicesRes, requestsRes] = await Promise.all([
      fetcher<any[]>("/services/my-services", {
        headers: { Cookie: cookieString },
        cache: "no-store",
      }),
      fetcher<any[]>("/service-requests/provider-requests", {
        headers: { Cookie: cookieString },
        cache: "no-store",
      }),
    ])

    const services = servicesRes.data || []
    const requests = requestsRes.data || []

    return {
      totalServices: services.length,
      totalRequests: requests.length,
      pendingRequests: requests.filter((r) => r.status === "PENDING").length,
      completedRequests: requests.filter((r) => r.status === "COMPLETED")
        .length,
    }
  } catch {
    return {
      totalServices: 0,
      totalRequests: 0,
      pendingRequests: 0,
      completedRequests: 0,
    }
  }
}

export default async function ProviderDashboardPage() {
  const stats = await getProviderStats()

  const cards = [
    {
      title: "My Listed Services",
      value: stats.totalServices,
      subText: "Active packages on portal",
      icon: Boxes,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      href: "/provider/my-services",
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      subText: "Requires response",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/provider/service-requests",
    },
    {
      title: "Total Service Requests",
      value: stats.totalRequests,
      subText: "Incoming orders",
      icon: Wrench,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      href: "/provider/service-requests",
    },
    {
      title: "Completed Works",
      value: stats.completedRequests,
      subText: "Fulfilled service orders",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/provider/service-requests",
    },
  ]

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <PageHeader
          title="Service Provider Dashboard"
          description="Manage your published power services, review incoming customer requests, and update order statuses."
        />

        <Link
          href="/provider/create-service"
          className="inline-flex shrink-0 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <PlusCircle className="mr-2 size-4" />
          Create Service
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  {card.title}
                </span>
                <div className={`rounded-xl border p-2.5 ${card.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {card.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {card.subText}
                </p>
              </div>

              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 transition-transform group-hover:translate-x-1">
                Manage Section <ArrowRight className="ml-1 size-3.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
