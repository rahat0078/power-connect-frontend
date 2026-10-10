"use client"

import {
  Users,
  Wrench,
  ShoppingBag,
  Wallet,
  Shield,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { IDashboardStats } from "./_actions/admin-stats"

interface AdminDashboardClientProps {
  user: TGetMeResponse | null
  stats: IDashboardStats | null
}

export default function AdminDashboardClient({
  stats,
  user,
}: AdminDashboardClientProps) {
  const formattedRevenue = stats?.totalRevenue
    ? Number(stats.totalRevenue).toLocaleString("en-BD")
    : "0"

  const statCards = [
    {
      title: "Total Registered Users",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "Active Power Services",
      value: stats?.totalServices ?? 0,
      icon: Wrench,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Total Service Requests",
      value: stats?.totalRequests ?? 0,
      icon: ShoppingBag,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Platform Total Revenue",
      value: `৳ ${formattedRevenue} BDT`,
      icon: Wallet,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Shield className="size-3.5 text-blue-400" /> Admin Overview
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome Back, {user?.name || "Admin"}!
            </h1>
            <p className="text-sm text-slate-300">
              Monitor key metrics, review platform operations, and manage system
              resources.
            </p>
          </div>
        </div>
      </div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon
          return (
            <div
              key={idx}
              className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {card.title}
                </span>
                <div className={`rounded-xl border p-2.5 ${card.color}`}>
                  <Icon className="size-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {card.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/admin/providers"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300"
        >
          <div>
            <h3 className="font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              Pending Provider Approvals
            </h3>
            <p className="text-xs text-slate-500">
              Review business applications
            </p>
          </div>
          <ArrowUpRight className="size-5 text-slate-400 transition-colors group-hover:text-blue-600" />
        </Link>

        <Link
          href="/admin/schedules"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300"
        >
          <div>
            <h3 className="font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              Power Schedules
            </h3>
            <p className="text-xs text-slate-500">
              Manage load shedding & outages
            </p>
          </div>
          <ArrowUpRight className="size-5 text-slate-400 transition-colors group-hover:text-blue-600" />
        </Link>

        <Link
          href="/admin/audit-logs"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300"
        >
          <div>
            <h3 className="font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              System Audit Logs
            </h3>
            <p className="text-xs text-slate-500">
              Track all administrative actions
            </p>
          </div>
          <ArrowUpRight className="size-5 text-slate-400 transition-colors group-hover:text-blue-600" />
        </Link>
      </div>
    </div>
  )
}
