"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Sparkles, ArrowRight, Building2, Phone, MapPin, Loader2, ShieldCheck, Zap } from "lucide-react"

import {
  createProviderProfileZodSchema,
  type CreateProviderApplyFormValues,
} from "@/schemas/provider-apply.schema"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { applyForProvider } from "./_actions/provider-apply"

export default function BecomeProviderBanner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProviderApplyFormValues>({
    resolver: zodResolver(createProviderProfileZodSchema),
  })

  const onSubmit = async (values: CreateProviderApplyFormValues) => {
    try {
      setIsSubmitting(true)
      const res = await applyForProvider(values)

      toast.success(res.message || "Application submitted successfully!")
      reset()
      setIsOpen(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to submit provider application")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Prominent Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
              <Sparkles className="size-3.5 fill-amber-400" /> Partner With PowerConnect
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Earn by Offering Power Solutions & Utility Maintenance
            </h2>
            <p className="text-sm text-slate-300">
              Register your business, provide technical power support to residents, and manage service requests directly from your dashboard.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-lg shrink-0 rounded-xl transition-all"
          >
            Become a Verified Provider <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      {/* Application Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="size-5 text-amber-500 fill-amber-500" /> Apply as a Provider
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your official business details to send your application to admins.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="rounded-full"
              >
                ✕
              </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="businessName" className="text-xs font-semibold text-slate-700">
                  Business / Agency Name
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    id="businessName"
                    placeholder="e.g. Power Spark Solutions"
                    className="pl-9"
                    {...register("businessName")}
                  />
                </div>
                {errors.businessName && (
                  <p className="text-xs text-red-500">{errors.businessName.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold text-slate-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    id="phone"
                    placeholder="01898765432"
                    className="pl-9"
                    {...register("phone")}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="address" className="text-xs font-semibold text-slate-700">
                  Official Address / Office Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    id="address"
                    placeholder="e.g. Mirpur-10, Dhaka"
                    className="pl-9"
                    {...register("address")}
                  />
                </div>
                {errors.address && (
                  <p className="text-xs text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-3 border border-blue-100 text-xs text-blue-800">
                <ShieldCheck className="size-4 shrink-0 text-blue-600" />
                <span>Your application will be reviewed by platform administrators before activation.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-35"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}