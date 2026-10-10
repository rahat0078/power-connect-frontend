"use client"

import Link from "next/link"
import {
  Wrench,
  AlertTriangle,
  CreditCard,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react"

import { PageHeader } from "@/components/shared/page-header"

interface Stats {
  totalRequests: number
  pendingRequests: number
  acceptedRequests: number
  totalOutages: number
  totalPayments: number
}

export default function ResidentDashboardClient({ stats }: { stats: Stats }) {
  const statCards = [
    {
      title: "Active Requests",
      value: stats.totalRequests,
      subText: `${stats.acceptedRequests} Accepted / ${stats.pendingRequests} Pending`,
      icon: Wrench,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      href: "/resident/requests",
    },
    {
      title: "Outage Reports",
      value: stats.totalOutages,
      subText: "Submitted issues",
      icon: AlertTriangle,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      href: "/resident/reports",
    },
    {
      title: "Completed Payments",
      value: stats.totalPayments,
      subText: "Verified transactions",
      icon: CreditCard,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      href: "/resident/payments",
    },
    {
      title: "Pending Action",
      value: stats.acceptedRequests,
      subText: "Awaiting payment",
      icon: Clock,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      href: "/resident/requests",
    },
  ]

  return (
    <div className="space-y-8 pb-10">
      <PageHeader
        title="Resident Dashboard"
        description="Access power services, track requests, report outages, and complete payments seamlessly."
      />

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
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
                View Details <ArrowRight className="ml-1 size-3.5" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Action Banner */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-md md:flex-row md:items-center md:p-8">
        <div className="max-w-xl space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
            <Zap className="size-3.5 fill-amber-400 text-amber-400" /> Quick
            Actions
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Need a Power Service or facing an Outage?
          </h2>
          <p className="text-sm text-slate-300">
            You can request new solar & power installations or notify local
            administrators about unexpected power interruptions immediately.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Browse Services
          </Link>

          <Link
            href="/resident/reports"
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            Report Outage
          </Link>
        </div>
      </div>
    </div>
  )
}
