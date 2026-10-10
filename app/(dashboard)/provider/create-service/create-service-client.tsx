"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, Loader2, PlusCircle, Zap } from "lucide-react"
import Link from "next/link"

import {
  createPowerServiceZodSchema,
  type CreateServiceFormValues,
} from "@/schemas/service.schema"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Textarea } from "@/ui/textarea"
import { Label } from "@/ui/label"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { createPowerService } from "../_actions/service"

interface CreateServiceClientProps {
  user: TGetMeResponse | null
}

export default function CreateServiceClient({}: CreateServiceClientProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createPowerServiceZodSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      capacity: "",
    },
  })

  async function onSubmit(values: CreateServiceFormValues) {
    try {
      setIsSubmitting(true)
      const res = await createPowerService(values)

      toast.success(res.message || "Power Service created successfully!")
      router.push("/provider/my-services")
      router.refresh()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.message || "Something went wrong while creating the service"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-12">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <Link
          href="/provider/my-services"
          aria-label="Back to services"
          className="inline-flex size-9 items-center justify-center rounded-full transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="size-5 text-slate-600" />
          <span className="sr-only">Back to services</span>
        </Link>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
            <Zap className="size-6 fill-amber-500 text-amber-500" /> Create New
            Service
          </h1>
          <p className="text-sm text-slate-500">
            Fill out the form below to list a new power package or utility
            maintenance service.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-semibold text-slate-700">
              Service Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Solar Power System, Generator Maintenance"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
            <p className="text-xs text-slate-500">
              Provide a concise title that clearly identifies your service.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="font-semibold text-slate-700">
                Price (BDT ৳)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 2500"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="capacity"
                className="font-semibold text-slate-700"
              >
                Capacity / Unit Specs
              </Label>
              <Input
                id="capacity"
                placeholder="e.g. 5 kW, 1000 Ah, 3 Phase"
                {...register("capacity")}
              />
              {errors.capacity && (
                <p className="text-xs text-red-500">
                  {errors.capacity.message}
                </p>
              )}
              <p className="text-xs text-slate-500">
                Output rating, load limit, or capacity specification.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="font-semibold text-slate-700"
            >
              Detailed Description
            </Label>
            <Textarea
              id="description"
              rows={4}
              placeholder="Describe what is included in this service, installation timeline, and package specs..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/provider/my-services"
              aria-disabled={isSubmitting}
              className={`inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Cancel
            </Link>

            <Button
              type="submit"
              className="min-w-35 bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 size-4" />
                  Create Service
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
