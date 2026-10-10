/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  CheckCircle2,
  XCircle,
  Building2,
  Phone,
  MapPin,
  Mail,
  User,
  Clock,
  Loader2,
  ShieldCheck,
  AlertCircle,
  Zap,
} from "lucide-react"


import { Button } from "@/ui/button"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { approveProviderProfile, getPendingProviders, IPendingProvider, rejectProviderProfile } from "../_actions/admin-provider-approval"

interface AdminProvidersClientProps {
  user: TGetMeResponse | null
  initialPendingProviders: IPendingProvider[]
}

export default function AdminProvidersClient({
  initialPendingProviders,
}: AdminProvidersClientProps) {
  const [providers, setProviders] = useState<IPendingProvider[]>(
    initialPendingProviders
  )
  const [isLoading, setIsLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const refreshPendingProviders = async () => {
    setIsLoading(true)
    try {
      const res = await getPendingProviders()
      setProviders(res.data || [])
    } catch (error: any) {
      toast.error(error.message || "Failed to refresh applications.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprovalAction = async (id: string, isApprove: boolean) => {
    setUpdatingId(id)
    try {
      const res = isApprove
        ? await approveProviderProfile(id)
        : await rejectProviderProfile(id)

      toast.success(
        res.message ||
          (isApprove
            ? "Provider application approved!"
            : "Provider application rejected.")
      )
      await refreshPendingProviders()
    } catch (error: any) {
      toast.error(error.message || "Failed to process request.")
    } finally {
      setUpdatingId(null)
    }
  }
  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <ShieldCheck className="size-6 text-blue-600" /> Pending Provider
            Approvals
          </h1>
          <p className="text-sm text-slate-500">
            Review applicant details, verify business credentials, and grant
            provider access.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
          <Zap className="size-4 fill-amber-500 text-amber-500" />
          <span>Pending Applications: {providers.length}</span>
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </div>
      ) : providers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {providers.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-4">
                {/* Business Title & User Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <Building2 className="size-5 text-blue-600" />{" "}
                    {item.businessName}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                    <Clock className="size-3" />
                    Applied {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="size-3.5 shrink-0 text-slate-400" />
                    <span>
                      Applicant:{" "}
                      <strong className="text-slate-800">
                        {item.user?.name}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 shrink-0 text-slate-400" />
                    <span>
                      Email:{" "}
                      <strong className="text-slate-800">
                        {item.user?.email}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="size-3.5 shrink-0 text-slate-400" />
                    <span>
                      Phone:{" "}
                      <strong className="text-slate-800">{item.phone}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="size-3.5 shrink-0 text-slate-400" />
                    <span>
                      Address:{" "}
                      <strong className="text-slate-800">{item.address}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Approve / Reject Actions */}
              <div className="flex shrink-0 justify-end gap-3 border-t border-slate-100 pt-4 md:flex-col md:border-t-0 md:border-l md:pt-0 md:pl-6">
                <Button
                  size="sm"
                  className="min-w-30 bg-emerald-600 text-white hover:bg-emerald-700"
                  disabled={updatingId === item.id}
                  onClick={() => handleApprovalAction(item.id, true)}
                >
                  {updatingId === item.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="mr-1.5 size-4" /> Approve
                    </>
                  )}
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="min-w-30"
                  disabled={updatingId === item.id}
                  onClick={() => handleApprovalAction(item.id, false)}
                >
                  {updatingId === item.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      <XCircle className="mr-1.5 size-4" /> Reject
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <AlertCircle className="mx-auto mb-2 size-8 text-slate-400" />
          <p className="font-medium text-slate-600">
            No pending provider applications found.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            All applicant requests have been processed.
          </p>
        </div>
      )}
    </div>
  )
}
