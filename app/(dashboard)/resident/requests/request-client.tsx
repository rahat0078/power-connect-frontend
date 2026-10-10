/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Calendar,
  CreditCard,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/ui/button"
import type { ServiceRequest } from "./page"
import { createCheckoutSession } from "../_actions/payment"

interface RequestsClientPageProps {
  initialRequests: ServiceRequest[]
}

export default function RequestsClientPage({
  initialRequests,
}: RequestsClientPageProps) {
  const [requests] = useState<ServiceRequest[]>(initialRequests)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Handle Stripe Payment Trigger
 const handlePayment = async (requestId: string) => {
    setLoadingId(requestId)
    try {
      const res: any = await createCheckoutSession({
        serviceRequestId: requestId,
      })

      if (res?.success && res?.data?.checkoutUrl) {
        toast.loading("Redirecting to Stripe Checkout...")
        // window.location.assign ব্যবহার করলে ESLint error দেবে না
        window.location.assign(res.data.checkoutUrl)
      } else {
        toast.error(res?.message || "Failed to initialize payment session.")
        setLoadingId(null)
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong initiating payment.")
      setLoadingId(null)
    }
  }

  const getStatusBadge = (
    status: ServiceRequest["status"],
    isPaid: boolean
  ) => {
    if (isPaid) {
      return (
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="size-3" /> PAID
        </span>
      )
    }

    switch (status) {
      case "ACCEPTED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            ACCEPTED
          </span>
        )
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
            IN PROGRESS
          </span>
        )
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            COMPLETED
          </span>
        )
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
            CANCELLED
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            PENDING
          </span>
        )
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Service Requests
        </h1>
        <p className="text-sm text-slate-500">
          Track requested power services, check provider updates, and complete
          Stripe payments for accepted requests.
        </p>
      </div>

      {requests.length > 0 ? (
        <div className="grid gap-5">
          {requests.map((item) => {
            const isPaid = item.payment?.status === "PAID"
            const canPay = item.status === "ACCEPTED" && !isPaid

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 lg:flex-row lg:items-center"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status, isPaid)}
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="size-3" />
                      Scheduled: {new Date(item.scheduledAt).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.service.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-slate-500">
                      {item.service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-blue-600" />
                      <strong>Address:</strong> {item.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3.5 text-blue-600" />
                      <strong>Provider:</strong> {item.provider.businessName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="size-3.5 text-blue-600" />
                      <strong>Phone:</strong> {item.provider.phone}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 pt-4 lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                  <div className="text-left lg:text-right">
                    <p className="text-xs text-slate-400">Total Amount</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ৳ {Number(item.totalAmount).toLocaleString("en-BD")}
                    </p>
                  </div>

                  {/* ONLY show Pay Now if status is ACCEPTED and not paid */}
                  {canPay && (
                    <Button
                      onClick={() => handlePayment(item.id)}
                      disabled={loadingId === item.id}
                      className="bg-emerald-600 font-semibold text-white hover:bg-emerald-700"
                    >
                      {loadingId === item.id ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <CreditCard className="mr-2 size-4" />
                      )}
                      Pay Now
                    </Button>
                  )}

                  {item.status === "PENDING" && (
                    <span className="text-xs text-amber-600 italic">
                      Waiting for provider approval
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-medium text-slate-500">
            No service requests found.
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Browse the services page to request your first power service.
          </p>
        </div>
      )}
    </div>
  )
}
