
export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-slate-200" />
            <div className="h-7 w-64 rounded-md bg-slate-200" />
          </div>
          <div className="h-4 w-96 rounded-md bg-slate-100" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-slate-200" />
      </div>

      {/* Grid Content Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-6 w-28 rounded-full bg-slate-200" />
              <div className="h-5 w-20 rounded-full bg-slate-100" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-3/4 rounded bg-slate-100" />
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
              <div className="h-3 w-1/2 rounded bg-slate-200" />
              <div className="h-3 w-2/3 rounded bg-slate-200" />
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              <div className="h-8 w-20 rounded-md bg-slate-200" />
              <div className="h-8 w-20 rounded-md bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}