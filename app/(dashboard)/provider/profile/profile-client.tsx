"use client"

import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react"

import type { TGetMeResponse } from "@/components/home/public-navbar"
import { IProviderProfile } from "../_actions/provider-profile"

interface ProviderProfileClientProps {
  user: TGetMeResponse | null
  profile: IProviderProfile | null
}

export default function ProviderProfileClient({
  profile,
}: ProviderProfileClientProps) {
  if (!profile) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <AlertCircle className="mx-auto mb-2 size-8 text-slate-400" />
        <p className="font-medium text-slate-500">Provider profile information not found.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-slate-900 p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="size-3.5 text-amber-400" /> Provider Account
              </span>
              {profile.isApproved ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
                  <CheckCircle2 className="size-3.5" /> Approved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-400/30">
                  Pending Approval
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{profile.businessName}</h1>
            <p className="text-sm text-slate-200 flex items-center gap-1.5">
              <Building2 className="size-4 text-slate-300" /> Managed by {profile.user.name}
            </p>
          </div>
        </div>
      </div>

      {/* Main Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Information Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="size-5 text-blue-600" /> Business Details
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-slate-400 font-medium">Business Name</p>
              <p className="font-semibold text-slate-800">{profile.businessName}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Phone className="size-3 text-slate-400" /> Phone Number
              </p>
              <p className="font-semibold text-slate-800">{profile.phone}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <MapPin className="size-3 text-slate-400" /> Service Location / Address
              </p>
              <p className="font-semibold text-slate-800">{profile.address}</p>
            </div>
          </div>
        </div>

        {/* Account Owner Information Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserCheck className="size-5 text-blue-600" /> Owner Account Info
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs text-slate-400 font-medium">Owner Name</p>
              <p className="font-semibold text-slate-800">{profile.user.name}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Mail className="size-3 text-slate-400" /> Email Address
              </p>
              <p className="font-semibold text-slate-800">{profile.user.email}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs text-slate-400 font-medium">Email Verification</p>
                <span className={`text-xs font-semibold ${profile.user.emailVerified ? "text-emerald-600" : "text-amber-600"}`}>
                  {profile.user.emailVerified ? "Verified Account" : "Unverified"}
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="size-3 text-slate-400" /> Registered On
                </p>
                <p className="text-xs font-semibold text-slate-700">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}