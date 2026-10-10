/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  AlertTriangle,
  Zap,
} from "lucide-react"

import {
  createScheduleZodSchema,
  type CreateScheduleFormValues,
} from "@/schemas/schedule.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import {
  createPowerSchedule,
  deletePowerSchedule,
  getPowerSchedules,
  IPowerSchedule,
  updatePowerSchedule,
} from "../_actions/admin-schedule"

interface AdminSchedulesClientProps {
  user: TGetMeResponse | null
  initialSchedules: IPowerSchedule[]
}

export default function AdminSchedulesClient({
  initialSchedules,
}: AdminSchedulesClientProps) {
  const [schedules, setSchedules] = useState<IPowerSchedule[]>(initialSchedules)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<IPowerSchedule | null>(
    null
  )
  const [scheduleToDelete, setScheduleToDelete] =
    useState<IPowerSchedule | null>(null)
  const [actionId, setActionId] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateScheduleFormValues>({
    resolver: zodResolver(createScheduleZodSchema),
  })

  const refreshSchedules = async () => {
    setIsLoading(true)
    try {
      const res = await getPowerSchedules()
      setSchedules(res.data || [])
    } catch (error: any) {
      toast.error(error.message || "Failed to refresh schedules.")
    } finally {
      setIsLoading(false)
    }
  }

  // Create Form Submit
  const handleCreateSubmit = async (values: CreateScheduleFormValues) => {
    try {
      setIsSubmitting(true)
      const res = await createPowerSchedule(values)
      toast.success(res.message || "Power schedule created successfully!")
      reset()
      setIsCreateOpen(false)
      await refreshSchedules()
    } catch (error: any) {
      toast.error(error.message || "Failed to create power schedule")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Edit Form Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingSchedule) return

    setIsSubmitting(true)
    try {
      const formData = new FormData(e.currentTarget)
      const payload = {
        area: formData.get("area") as string,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as IPowerSchedule["status"],
      }

      const res = await updatePowerSchedule(editingSchedule.id, payload)
      toast.success(res.message || "Power schedule updated successfully!")
      setEditingSchedule(null)
      await refreshSchedules()
    } catch (error: any) {
      toast.error(error.message || "Failed to update schedule")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Delete Action
  const handleDelete = async () => {
    if (!scheduleToDelete) return
    const id = scheduleToDelete.id
    setActionId(id)
    try {
      const res = await deletePowerSchedule(id)
      toast.success(res.message || "Power schedule deleted successfully!")
      setScheduleToDelete(null)
      await refreshSchedules()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete schedule.")
    } finally {
      setActionId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <Zap className="size-6 fill-amber-500 text-amber-500" /> Power Load
            Shedding & Maintenance Schedules
          </h1>
          <p className="text-sm text-slate-500">
            Publish and manage area-wise outage schedules and substation
            maintenance routines.
          </p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="shrink-0 bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 size-4" /> Add New Schedule
        </Button>
      </div>

      {/* Schedules List */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </div>
      ) : schedules.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {schedules.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    <MapPin className="size-3.5" /> {item.area}
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Calendar className="size-3.5 text-slate-400" /> Start:{" "}
                    <strong className="text-slate-800">
                      {new Date(item.startTime).toLocaleString()}
                    </strong>
                  </p>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Clock className="size-3.5 text-slate-400" /> End:{" "}
                    <strong className="text-slate-800">
                      {new Date(item.endTime).toLocaleString()}
                    </strong>
                  </p>
                </div>

                {item.description && (
                  <p className="mt-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => setEditingSchedule(item)}
                >
                  <Edit3 className="mr-1 size-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs"
                  onClick={() => setScheduleToDelete(item)}
                >
                  <Trash2 className="mr-1 size-3.5" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <AlertTriangle className="mx-auto mb-2 size-8 text-slate-400" />
          <p className="font-medium text-slate-600">
            No power schedules listed yet.
          </p>
        </div>
      )}

      {/* Create Schedule Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 p-4 backdrop-blur-xs fade-in">
          <div className="w-full max-w-lg animate-in space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Zap className="size-5 fill-amber-500 text-amber-500" /> Create
                Power Schedule
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateOpen(false)}
                disabled={isSubmitting}
              >
                ✕
              </Button>
            </div>

            <form
              onSubmit={handleSubmit(handleCreateSubmit)}
              className="space-y-4"
            >
              <div className="space-y-1">
                <Label htmlFor="area">Target Area / Region</Label>
                <Input
                  id="area"
                  placeholder="e.g. Nasirabad, Chattogram"
                  {...register("area")}
                />
                {errors.area && (
                  <p className="text-xs text-red-500">{errors.area.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    {...register("startTime")}
                  />
                  {errors.startTime && (
                    <p className="text-xs text-red-500">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    {...register("endTime")}
                  />
                  {errors.endTime && (
                    <p className="text-xs text-red-500">
                      {errors.endTime.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  rows={3}
                  placeholder="e.g. Emergency substation repair work"
                  {...register("description")}
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  Create Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Schedule Modal */}
      {editingSchedule && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 p-4 backdrop-blur-xs fade-in">
          <div className="w-full max-w-lg animate-in space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl zoom-in-95">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Edit3 className="size-5 text-blue-600" /> Edit Power Schedule
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSchedule(null)}
                disabled={isSubmitting}
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="edit-area">Area</Label>
                <Input
                  id="edit-area"
                  name="area"
                  defaultValue={editingSchedule.area}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="edit-startTime">Start Time</Label>
                  <Input
                    id="edit-startTime"
                    name="startTime"
                    type="datetime-local"
                    defaultValue={
                      editingSchedule.startTime
                        ? new Date(editingSchedule.startTime)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="edit-endTime">End Time</Label>
                  <Input
                    id="edit-endTime"
                    name="endTime"
                    type="datetime-local"
                    defaultValue={
                      editingSchedule.endTime
                        ? new Date(editingSchedule.endTime)
                            .toISOString()
                            .slice(0, 16)
                        : ""
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  name="status"
                  defaultValue={editingSchedule.status}
                  className="w-full rounded-md border border-slate-200 p-2 text-sm"
                >
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  rows={3}
                  defaultValue={editingSchedule.description || ""}
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingSchedule(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {scheduleToDelete && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/60 p-4 backdrop-blur-xs fade-in">
          <div className="w-full max-w-md animate-in space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Schedule
                </h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete schedule for{" "}
                  <strong className="text-slate-700">
                    {scheduleToDelete.area}
                  </strong>
                  ?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setScheduleToDelete(null)}
                disabled={actionId === scheduleToDelete.id}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={actionId === scheduleToDelete.id}
                onClick={handleDelete}
              >
                {actionId === scheduleToDelete.id ? (
                  <>
                    <Loader2 className="mr-1.5 size-3.5 animate-spin" />{" "}
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
