/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Calendar, Loader2, MapPin } from "lucide-react"

import type { PowerService } from "@/types/service"
import { PublicNavbar } from "@/components/home/public-navbar"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { TApiResponse } from "@/types/apiResponse"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateServiceRequestInput, createServiceRequestZodSchema } from "@/schemas/serviceRequest"
import { createServiceRequest } from "@/app/(dashboard)/resident/_actions/createRequest"

interface ServicesClientProps {
  user: TGetMeResponse | null
  initialResponse: TApiResponse<PowerService[]>
}

export default function ServicesClient({
  user,
  initialResponse,
}: ServicesClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Modal and Booking States
  const [selectedService, setSelectedService] = useState<PowerService | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize input states from current URL search params
  const [search, setSearch] = useState(searchParams.get("searchTerm") || "")
  const [min, setMin] = useState(searchParams.get("minPrice") || "")
  const [max, setMax] = useState(searchParams.get("maxPrice") || "")

  // React Hook Form for Modal
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateServiceRequestInput>({
    resolver: zodResolver(createServiceRequestZodSchema),
  })

  const updateQueryParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const applyFilters = () => {
    updateQueryParams({
      searchTerm: search.trim() || null,
      minPrice: min === "" ? null : min,
      maxPrice: max === "" ? null : max,
      page: 1,
    })
  }

  const resetFilters = () => {
    setSearch("")
    setMin("")
    setMax("")

    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  const changePage = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  // Open Request Modal Handler
  const handleOpenModal = (service: PowerService) => {
    if (!user) {
      toast.error("Please login to request a service")
      router.push(`/login?redirectTo=/services`)
      return
    }

    setSelectedService(service)
    setValue("serviceId", service.id)
    setIsModalOpen(true)
  }

  // Submit Request Handler
  const onSubmitRequest = async (data: CreateServiceRequestInput) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...data,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
      }

      const res: any = await createServiceRequest(payload)

      if (res?.success) {
        toast.success(res.message || "Service request created successfully!")
        reset()
        setIsModalOpen(false)
        router.push("/resident/requests")
      } else {
        toast.error(res?.message || "Failed to create service request")
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const { data: services, meta } = initialResponse

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Search & Price Inputs */}
        <div className="mb-6 grid gap-3 sm:grid-cols-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services"
            className="rounded-md border px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Minimum price"
            className="rounded-md border px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Maximum price"
            className="rounded-md border px-3 py-2"
          />

          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              disabled={isPending}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            >
              {isPending ? "Searching..." : "Search"}
            </button>

            <button
              onClick={resetFilters}
              disabled={isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing {services.length} of {meta?.total ?? 0} services
        </p>

        {isPending && <p className="mb-4 text-sm text-muted-foreground">Updating results...</p>}

        {services.length === 0 && !isPending && (
          <p className="py-10 text-center">No services found.</p>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-4 rounded-lg bg-muted/60 p-4">
                  <p className="font-medium">{service.provider.businessName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.provider.address}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {service.provider.phone}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-xl font-semibold">
                    ৳ {Number(service.price).toLocaleString("en-BD")}
                  </p>
                  <span className="inline-block mt-1 rounded-md bg-muted px-2 py-0.5 text-xs">
                    {service.capacity}
                  </span>
                </div>

                <Button
                  onClick={() => handleOpenModal(service)}
                  className="bg-primary text-primary-foreground"
                >
                  Request Service
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination controls */}
        {meta?.totalPages && meta?.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t pt-5">
            <button
              onClick={() => changePage(meta.page! - 1)}
              disabled={meta.page! <= 1 || isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {meta.page} of {meta.totalPages}
            </span>

            <button
              onClick={() => changePage(meta.page! + 1)}
              disabled={meta.page! >= meta.totalPages || isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Service Request Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Request {selectedService?.name}</DialogTitle>
            <DialogDescription>
              Enter your service address and preferred date & time to submit your request.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitRequest)} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="address" className="flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" /> Service Address
              </Label>
              <Input
                id="address"
                placeholder="e.g., Mirpur 10, Dhaka-1212"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="scheduledAt" className="flex items-center gap-1.5">
                <Calendar className="size-4 text-primary" /> Schedule Date & Time
              </Label>
              <Input
                id="scheduledAt"
                type="datetime-local"
                {...register("scheduledAt")}
              />
              {errors.scheduledAt && (
                <p className="text-xs text-red-500">{errors.scheduledAt.message}</p>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Confirm Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}