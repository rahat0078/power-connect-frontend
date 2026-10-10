import Link from "next/link"
import { XCircle, ArrowLeft } from "lucide-react"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-600 mb-6">
          <XCircle className="size-10" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payment Cancelled
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Your payment process was cancelled or interrupted. No charges were made to your account.
        </p>

        <div className="mt-8">
          <Link
            href="/resident/requests"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to My Requests
          </Link>
        </div>
      </div>
    </div>
  )
}