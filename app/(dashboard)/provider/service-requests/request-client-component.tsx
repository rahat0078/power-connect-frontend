/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  CheckCircle2,
  XCircle,
  Clock,
  User,
  MapPin,
  Loader2,
  Zap,
  AlertCircle,
  PlayCircle,
  CheckCheck,
} from "lucide-react"


import { Button } from "@/ui/button"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { completeServiceRequest, getProviderServiceRequests, IServiceRequest, RequestStatus, updateServiceRequestStatus } from "../_actions/provider-service-request"

interface ProviderRequestsClientProps {
  user: TGetMeResponse | null
  initialRequests: IServiceRequest[]
}

export default function ProviderRequestsClient({
  initialRequests,
}: ProviderRequestsClientProps) {
  const [requests, setRequests] = useState<IServiceRequest[]>(initialRequests)
  const [isLoading, setIsLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const refreshRequests = async () => {
    setIsLoading(true)
    try {
      const res = await getProviderServiceRequests()
      setRequests(res.data || [])
    } catch (error: any) {
      toast.error(error.message || "Failed to refresh service requests.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Accept / Cancel / In Progress Status
  const handleStatusChange = async (
    id: string,
    status: Extract<RequestStatus, "ACCEPTED" | "CANCELLED" | "IN_PROGRESS">
  ) => {
    setUpdatingId(id)
    try {
      const res = await updateServiceRequestStatus(id, status)
      toast.success(res.message || `Request status changed to ${status}`)
      await refreshRequests()
    } catch (error: any) {
      toast.error(error.message || "Failed to update request status.")
    } finally {
      setUpdatingId(null)
    }
  }

  // Handle Complete Action
  const handleComplete = async (id: string) => {
    setUpdatingId(id)
    try {
      const res = await completeServiceRequest(id)
      toast.success(res.message || "Service marked as completed!")
      await refreshRequests()
    } catch (error: any) {
      toast.error(error.message || "Failed to complete service.")
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "IN_PROGRESS":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "COMPLETED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
          <Zap className="size-6 fill-amber-500 text-amber-500" /> Service Requests Management
        </h1>
        <p className="text-sm text-slate-500">
          Review resident service orders, update progress, and complete requests.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </div>
      ) : requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="size-3" />
                    {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{req.service?.name || "Power Service"}</h3>
                  <p className="text-sm font-semibold text-blue-600">৳ {req.service?.price} BDT</p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="size-3.5 text-slate-400" />
                    <span>
                      Resident: <strong className="text-slate-700">{req.resident?.name}</strong> ({req.resident?.email})
                    </span>
                  </div>
                  {req.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-slate-400" />
                      <span>Address: <strong className="text-slate-700">{req.address}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Workflows based on RequestStatus */}
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-slate-200 pt-4 md:flex-col md:border-t-0 md:border-l md:pt-0 md:pl-6">
                {req.status === "PENDING" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 text-white hover:bg-emerald-700"
                      disabled={updatingId === req.id}
                      onClick={() => handleStatusChange(req.id, "ACCEPTED")}
                    >
                      {updatingId === req.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="mr-1 size-3.5" /> Accept
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={updatingId === req.id}
                      onClick={() => handleStatusChange(req.id, "CANCELLED")}
                    >
                      <XCircle className="mr-1 size-3.5" /> Cancel Request
                    </Button>
                  </div>
                )}

                {req.status === "ACCEPTED" && (
                  <Button
                    size="sm"
                    className="bg-amber-600 text-white hover:bg-amber-700"
                    disabled={updatingId === req.id}
                    onClick={() => handleStatusChange(req.id, "IN_PROGRESS")}
                  >
                    {updatingId === req.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <>
                        <PlayCircle className="mr-1 size-3.5" /> Start Progress
                      </>
                    )}
                  </Button>
                )}

                {req.status === "IN_PROGRESS" && (
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    disabled={updatingId === req.id}
                    onClick={() => handleComplete(req.id)}
                  >
                    {updatingId === req.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCheck className="mr-1 size-3.5" /> Mark Completed
                      </>
                    )}
                  </Button>
                )}

                {req.status === "COMPLETED" && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <CheckCheck className="size-4" /> Service Completed
                  </span>
                )}

                {req.status === "CANCELLED" && (
                  <span className="text-xs font-semibold text-red-500">
                    Request Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <AlertCircle className="mx-auto mb-2 size-8 text-slate-400" />
          <p className="font-medium text-slate-500">No service requests assigned to you yet.</p>
        </div>
      )}
    </div>
  )
}