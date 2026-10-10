import { PageHeader } from "@/components/shared/page-header"

export default function ResidentDashboardLoading() {
  return (
    <div className="animate-pulse space-y-8 pb-10">
      <PageHeader
        title="Resident Dashboard"
        description="Access power services, track requests, report outages, and complete payments seamlessly."
      />

      {/* Stats Cards Skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="size-10 rounded-xl bg-slate-100" />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-8 w-16 rounded bg-slate-200" />
              <div className="h-3 w-36 rounded bg-slate-100" />
            </div>

            <div className="mt-4 h-3 w-20 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Quick Action Banner Skeleton */}
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-md md:flex-row md:items-center md:p-8">
        <div className="w-full max-w-xl space-y-3">
          <div className="h-5 w-28 rounded-full bg-slate-800" />
          <div className="h-6 w-3/4 rounded bg-slate-800" />
          <div className="h-4 w-full rounded bg-slate-800/60" />
        </div>

        <div className="flex shrink-0 gap-3">
          <div className="h-10 w-32 rounded-md bg-slate-800" />
          <div className="h-10 w-28 rounded-md bg-slate-800/60" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Requests Skeleton */}
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="h-6 w-44 rounded bg-slate-200" />
            <div className="h-8 w-24 rounded-md bg-slate-100" />
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="size-11 shrink-0 rounded-xl bg-slate-100" />

                    <div className="flex-1 space-y-3">
                      <div className="h-4 w-40 rounded bg-slate-200" />
                      <div className="h-3 w-56 max-w-full rounded bg-slate-100" />
                      <div className="h-3 w-32 rounded bg-slate-100" />
                    </div>
                  </div>

                  <div className="h-6 w-20 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 h-5 w-32 rounded bg-slate-200" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-slate-100" />
                  <div className="h-4 flex-1 rounded bg-slate-100" />
                  <div className="size-4 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Account Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 h-5 w-36 rounded bg-slate-200" />

            <div className="space-y-5">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="h-4 w-28 rounded bg-slate-100" />
                  <div className="h-4 w-16 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
