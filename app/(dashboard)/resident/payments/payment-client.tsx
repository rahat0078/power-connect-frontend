"use client"

import { useState } from "react"
import { CheckCircle2, Clock, CreditCard, Hash, MapPin, Receipt, ShieldCheck, User } from "lucide-react"

import type { PaymentHistoryItem } from "./page"

interface PaymentsClientPageProps {
  initialPayments: PaymentHistoryItem[]
}

export default function PaymentsClientPage({ initialPayments }: PaymentsClientPageProps) {
  const [payments] = useState<PaymentHistoryItem[]>(initialPayments)

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payment History
        </h1>
        <p className="text-sm text-slate-500">
          View all your completed Stripe payments, transaction records, and associated service details.
        </p>
      </div>

      {payments.length > 0 ? (
        <div className="grid gap-5">
          {payments.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="size-3" /> {item.status}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    <CreditCard className="size-3 text-slate-500" /> {item.paymentMethod}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="size-3" />
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
                    <Receipt className="size-5 text-blue-600" />
                    {item.serviceRequest.service.name}
                    <span className="text-xs font-normal bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {item.serviceRequest.service.capacity}
                    </span>
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="flex items-center gap-1">
                    <User className="size-3.5 text-slate-400" />
                    <strong>Provider:</strong> {item.serviceRequest.provider.businessName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5 text-slate-400" />
                    <strong>Address:</strong> {item.serviceRequest.address}
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5 font-mono bg-slate-100/70 p-2 rounded w-fit">
                  <Hash className="size-3.5 text-slate-400" />
                  <span className="text-slate-400">TxID:</span>
                  <span className="text-slate-700 truncate max-w-75 md:max-w-112.5">
                    {item.transactionId}
                  </span>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 shrink-0">
                <div className="text-left md:text-right">
                  <p className="text-xs text-slate-400 font-medium">Paid Amount</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ৳ {Number(item.amount).toLocaleString("en-BD")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center max-w-md mx-auto">
          <ShieldCheck className="mx-auto size-10 text-slate-300 mb-2" />
          <p className="text-slate-500 font-medium">No payment history found.</p>
          <p className="text-xs text-slate-400 mt-1">Complete payments for your accepted service requests to see them here.</p>
        </div>
      )}
    </div>
  )
}