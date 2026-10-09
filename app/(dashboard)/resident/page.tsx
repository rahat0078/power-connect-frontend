import { PageHeader } from "@/components/shared/page-header"
export default function ResidentPage() {
  return (
    <>
      <PageHeader
        title="Resident Dashboard"
        description="Access utility services, requests, outages, and payments in one place."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          "Available Services",
          "My Requests",
          "Outage Reports",
          "Payments",
        ].map((label) => (
          <div key={label} className="h-32 rounded-xl border bg-white p-5">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <div className="mt-5 h-6 w-16 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </>
  )
}
