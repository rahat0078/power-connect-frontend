/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Plus,
  Trash2,
  Edit3,
  Power,
  Loader2,
  Wrench,
  Tag,
  Zap,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Label } from "@/ui/label"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import {
  deletePowerService,
  getMyServices,
  IPowerService,
  updatePowerService,
  updateServiceStatus,
} from "../_actions/service"

interface MyServicesClientProps {
  user: TGetMeResponse | null
  initialServices: IPowerService[]
}

export default function MyServicesClient({
  initialServices,
}: MyServicesClientProps) {
  const [services, setServices] = useState<IPowerService[]>(initialServices)
  const [isLoading, setIsLoading] = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)
  const [serviceToDelete, setServiceToDelete] = useState<IPowerService | null>(
    null
  )

  // Edit State
  const [editingService, setEditingService] = useState<IPowerService | null>(
    null
  )
  const [isUpdating, setIsUpdating] = useState(false)

  const refreshServices = async () => {
    setIsLoading(true)
    try {
      const res = await getMyServices()
      setServices(res.data || [])
    } catch (error: any) {
      toast.error(error.message || "Failed to refresh services.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Status Toggle (ACTIVE <-> INACTIVE)
  const handleStatusToggle = async (service: IPowerService) => {
    const newStatus = service.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
    setActionId(service.id)
    try {
      const res = await updateServiceStatus(service.id, newStatus)
      toast.success(res.message || `Service status changed to ${newStatus}`)
      await refreshServices()
    } catch (error: any) {
      toast.error(error.message || "Failed to update status.")
    } finally {
      setActionId(null)
    }
  }

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    setActionId(id)
    try {
      const res = await deletePowerService(id)
      toast.success(res.message || "Service deleted successfully!")
      await refreshServices()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete service.")
    } finally {
      setActionId(null)
    }
  }

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingService) return

    setIsUpdating(true)
    try {
      const formData = new FormData(e.currentTarget)
      const payload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: Number(formData.get("price")),
        capacity: formData.get("capacity") as string,
      }

      const res = await updatePowerService(editingService.id, payload)
      toast.success(res.message || "Power Service updated successfully!")
      setEditingService(null)
      await refreshServices()
    } catch (error: any) {
      toast.error(error.message || "Failed to update service.")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <Zap className="size-6 fill-amber-500 text-amber-500" /> My Power
            Services
          </h1>
          <p className="text-sm text-slate-500">
            Manage your listed power packages, update pricing, specifications,
            and availability status.
          </p>
        </div>

        <Link
          href="/provider/create-service"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="mr-2 size-4" />
          Add New Service
        </Link>
      </div>

      {/* Services List / Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-blue-600" />
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      service.status === "ACTIVE"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-amber-200 bg-amber-50 text-amber-700"
                    }`}
                  >
                    <Power className="size-3" /> {service.status}
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    ৳ {service.price} BDT
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {service.name}
                </h3>

                <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Tag className="size-3.5 text-slate-400" />
                  <span>
                    Capacity:{" "}
                    <strong className="text-slate-700">
                      {service.capacity}
                    </strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  disabled={actionId === service.id}
                  onClick={() => handleStatusToggle(service)}
                >
                  {service.status === "ACTIVE" ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => setEditingService(service)}
                >
                  <Edit3 className="mr-1 size-3.5" /> Edit
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="text-xs"
                  disabled={actionId === service.id}
                  onClick={() => setServiceToDelete(service)}
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
          <p className="font-medium text-slate-500">
            You haven`&apos;`t listed any power services yet.
          </p>
        </div>
      )}

      {/* Edit Service Modal / Form Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg animate-in space-y-6 rounded-2xl bg-white p-6 shadow-xl zoom-in-95 fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <Wrench className="size-5 text-blue-600" /> Edit Service
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingService(null)}
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingService.name}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="price">Price (BDT)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={editingService.price}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    defaultValue={editingService.capacity}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={editingService.description}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingService(null)}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : null}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Delete Confirmation Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/50 p-4 backdrop-blur-xs fade-in">
          <div className="w-full max-w-md animate-in space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Service
                </h3>
                <p className="text-xs text-slate-500">
                  Are you sure you want to delete{" "}
                  <strong className="text-slate-700">
                    {serviceToDelete.name}
                  </strong>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setServiceToDelete(null)}
                disabled={actionId === serviceToDelete.id}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="bg-red-600 text-white hover:bg-red-700"
                disabled={actionId === serviceToDelete.id}
                onClick={async () => {
                  const id = serviceToDelete.id
                  setActionId(id)
                  try {
                    const res = await deletePowerService(id)
                    toast.success(
                      res.message || "Service deleted successfully!"
                    )
                    setServiceToDelete(null)
                    await refreshServices()
                  } catch (error: any) {
                    toast.error(error.message || "Failed to delete service.")
                  } finally {
                    setActionId(null)
                  }
                }}
              >
                {actionId === serviceToDelete.id ? (
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
