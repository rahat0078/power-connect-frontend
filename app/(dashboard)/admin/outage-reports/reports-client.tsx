"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  AlertTriangle,
  Clock,
  Loader2,
  MapPin,
  User,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import {
  getAllPlatformOutageReports,
  OutageReport,
  updateOutageStatus,
} from "../_actions/admin-outage"
import { StatusType } from "../_actions/admin-outage-constants"

interface AdminOutageReportsClientProps {
  user: TGetMeResponse | null
  initialReports: OutageReport[]
}

export default function AdminOutageReportsClient({
  initialReports,
}: AdminOutageReportsClientProps) {
  const [reports, setReports] = useState<OutageReport[]>(initialReports)
  const [isFetching, setIsFetching] = useState(false)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const refreshReports = async () => {
    setIsFetching(true)
    try {
      const res = await getAllPlatformOutageReports()
      setReports(res.data || [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to load platform outage reports.")
    } finally {
      setIsFetching(false)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: StatusType) => {
    setUpdatingId(id)
    try {
      const res = await updateOutageStatus(id, newStatus)
      toast.success(res.message || "Outage status updated successfully!")
      await refreshReports()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to update status.")
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "INVESTIGATING":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "REJECTED":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-amber-50 text-amber-700 border-amber-200"
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Platform Outage Reports Management
        </h1>
        <p className="text-sm text-slate-500">
          Review reported localized power failures from residents and update
          their resolution status.
        </p>
      </div>

      {isFetching ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </div>
      ) : reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col justify-between gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusBadge(
                      report.status
                    )}`}
                  >
                    {report.status}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="size-3" />
                    {new Date(report.createdAt).toLocaleString()}
                  </span>
                </div>

                <h3 className="flex items-center gap-1.5 text-lg font-semibold text-slate-900">
                  <MapPin className="size-5 shrink-0 text-blue-600" />
                  {report.area}
                </h3>

                <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                  {report.description}
                </p>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <User className="size-3.5 text-slate-400" />
                  <span>
                    Reported by:{" "}
                    <strong className="text-slate-700">
                      {report.user.name}
                    </strong>{" "}
                    ({report.user.email})
                  </span>
                </div>
              </div>

              {/* Action Buttons to update status */}
              <div className="flex shrink-0 flex-wrap gap-2 border-t border-slate-200 pt-4 md:flex-col md:border-t-0 md:border-l md:pt-0 md:pl-6">
                <p className="mb-1 hidden text-xs font-medium text-slate-500 md:block">
                  Update Status:
                </p>
                <div className="grid w-full grid-cols-2 gap-2 md:flex md:flex-col">
                  <Button
                    size="sm"
                    variant={
                      report.status === "INVESTIGATING" ? "default" : "outline"
                    }
                    className="justify-start text-xs"
                    disabled={
                      updatingId === report.id ||
                      report.status === "INVESTIGATING"
                    }
                    onClick={() =>
                      handleStatusUpdate(report.id, "INVESTIGATING")
                    }
                  >
                    <ShieldAlert className="mr-1.5 size-3.5 text-blue-500" />{" "}
                    Investigating
                  </Button>

                  <Button
                    size="sm"
                    variant={
                      report.status === "RESOLVED" ? "default" : "outline"
                    }
                    className="justify-start text-xs"
                    disabled={
                      updatingId === report.id || report.status === "RESOLVED"
                    }
                    onClick={() => handleStatusUpdate(report.id, "RESOLVED")}
                  >
                    <CheckCircle2 className="mr-1.5 size-3.5 text-emerald-500" />{" "}
                    Resolve
                  </Button>

                  <Button
                    size="sm"
                    variant={
                      report.status === "REJECTED" ? "destructive" : "outline"
                    }
                    className="justify-start text-xs"
                    disabled={
                      updatingId === report.id || report.status === "REJECTED"
                    }
                    onClick={() => handleStatusUpdate(report.id, "REJECTED")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <AlertTriangle className="mx-auto mb-2 size-8 text-slate-400" />
          <p className="font-medium text-slate-500">
            No power outage reports found on the platform.
          </p>
        </div>
      )}
    </div>
  )
}
