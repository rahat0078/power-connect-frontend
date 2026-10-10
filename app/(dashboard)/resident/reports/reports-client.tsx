"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { AlertTriangle, Clock, Loader2, MapPin, PlusCircle } from "lucide-react"

import {
  createOutageReportZodSchema,
  type OutageFormValues,
} from "@/schemas/outage.schema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { createOutageReport, getMyOutageReports, OutageReport } from "../_actions/outage"

interface ResidentReportsClientProps {
  user: TGetMeResponse | null
  initialReports: OutageReport[]
}

export default function ResidentReportsClient({
  initialReports,
}: ResidentReportsClientProps) {
  const [reports, setReports] = useState<OutageReport[]>(initialReports)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OutageFormValues>({
    resolver: zodResolver(createOutageReportZodSchema),
    defaultValues: {
      area: "",
      description: "",
    },
  })

  const refreshReports = async () => {
    setIsFetching(true)
    try {
      const res = await getMyOutageReports()
      setReports(res.data || [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to refresh reports.")
    } finally {
      setIsFetching(false)
    }
  }

  const onSubmit = async (data: OutageFormValues) => {
    setIsLoading(true)
    
    try {
      const res = await createOutageReport(data)
      toast.success(res.message || "Outage report submitted successfully!")
      reset()
      await refreshReports()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to submit outage report.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Power Outage Reports
        </h1>
        <p className="text-sm text-slate-500">
          Report localized power failures in your area and track their
          investigation status.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Submit Report Form */}
        <div className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-1">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <PlusCircle className="size-5 text-blue-600" /> Report an Outage
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="area">Area / Location</Label>
              <Input
                id="area"
                placeholder="e.g., Rangpur Sadar"
                {...register("area")}
              />
              {errors.area && (
                <p className="text-xs text-red-500">{errors.area.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the issue (e.g., Electricity unavailable since 12 AM)"
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Submit Report
            </Button>
          </form>
        </div>

        {/* My Reports List */}
        <div className="space-y-4 md:col-span-2">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <AlertTriangle className="size-5 text-amber-500" /> My Submitted
            Reports
          </h2>

          {isFetching ? (
            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-12">
              <Loader2 className="size-6 animate-spin text-blue-600" />
            </div>
          ) : reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                      {report.status}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="size-3" />{" "}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="flex items-center gap-1.5 text-base font-semibold text-slate-900">
                    <MapPin className="size-4 shrink-0 text-blue-600" />
                    {report.area}
                  </h3>

                  <p className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                    {report.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <p className="font-medium text-slate-500">
                No outage reports submitted yet.
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Submit your first report using the form on the left.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}