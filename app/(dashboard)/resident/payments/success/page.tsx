import Link from "next/link"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const resolvedParams = await searchParams
  const sessionId = resolvedParams.session_id

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-10" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payment Successful!
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Thank you! Your payment has been successfully processed and your
          service request is now confirmed.
        </p>

        {sessionId && (
          <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs break-all text-slate-500">
            <strong>Session ID:</strong> {sessionId}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2">
          <Link
            href="/resident/requests"
            className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            View My Requests
            <ArrowRight className="ml-2 size-4" />
          </Link>

          <Link
            href="/services"
            className="inline-flex w-full items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse More Services
          </Link>
        </div>
      </div>
    </div>
  )
}
