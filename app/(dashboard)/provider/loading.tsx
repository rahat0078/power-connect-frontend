import { Loader2, Zap } from "lucide-react"

export default function ProviderLoading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-16 rounded-full bg-blue-100 animate-ping" />
        
        <div className="relative flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Zap className="size-7 fill-amber-500 text-amber-500" />
        </div>
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center justify-center gap-2">
          <Loader2 className="size-4 animate-spin text-blue-600" /> Loading Provider Dashboard...
        </h2>
        <p className="text-xs text-slate-500">
          Please wait while we fetch your services and updates.
        </p>
      </div>
    </div>
  )
}