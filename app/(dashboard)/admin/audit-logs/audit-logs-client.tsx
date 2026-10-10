"use client"

import { useState } from "react"
import { Clock, Shield, User, Activity, AlertCircle } from "lucide-react"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { IAuditLog } from "../_actions/admin-audit-logs"

interface AuditLogsClientProps {
  user: TGetMeResponse | null
  initialLogs: IAuditLog[]
}

export default function AuditLogsClient({ initialLogs }: AuditLogsClientProps) {
  const [logs] = useState<IAuditLog[]>(initialLogs)

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "UPDATE":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "DELETE":
      case "REJECT":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <Activity className="size-6 text-blue-600" /> System Audit Logs
        </h1>
        <p className="text-sm text-slate-500">
          Review system-wide activity, administrative actions, and entity change records.
        </p>
      </div>

      {logs.length > 0 ? (
        <div className="space-y-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getActionBadge(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                    {log.entity}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="size-3.5" />
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="size-4 text-slate-400 shrink-0" />
                  <span>
                    Performed By: <strong className="text-slate-800">{log.user?.name}</strong> ({log.user?.email})
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-600">
                  <Shield className="size-4 text-slate-400 shrink-0" />
                  <span>
                    Role: <strong className="text-slate-800">{log.user?.role}</strong>
                  </span>
                </div>
              </div>

              {log.metadata && Object.keys(log.metadata).length > 0 && (
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700 font-mono border border-slate-100 overflow-x-auto">
                  <pre className="whitespace-pre-wrap">{JSON.stringify(log.metadata, null, 2)}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <AlertCircle className="mx-auto size-8 text-slate-400 mb-2" />
          <p className="font-medium text-slate-600">No audit logs recorded yet.</p>
        </div>
      )}
    </div>
  )
}