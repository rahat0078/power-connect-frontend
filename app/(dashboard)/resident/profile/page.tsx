
import { User, Mail, Shield, Calendar, Phone, MapPin } from "lucide-react"
import { getMe } from "@/app/(public)/_actions/getMe"



export default async function ResidentProfilePage() {
  const user = await getMe()

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>
        <p className="text-sm text-slate-500">
          View your account information and personal details.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {/* Cover / Header section */}
        <div className="flex items-center gap-4 bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
          <div className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-white/20 text-2xl font-bold backdrop-blur-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {user?.name || "Resident User"}
            </h2>
            <p className="mt-0.5 flex items-center gap-1 text-sm text-blue-100">
              <Shield className="size-3.5" /> {user?.role || "RESIDENT"}
            </p>
          </div>
        </div>

        {/* Details section */}
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <User className="size-3.5 text-blue-600" /> Full Name
              </span>
              <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-800">
                {user?.name || "N/A"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Mail className="size-3.5 text-blue-600" /> Email Address
              </span>
              <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-800">
                {user?.email || "N/A"}
              </p>
            </div>

         

            <div className="space-y-1">
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Calendar className="size-3.5 text-blue-600" /> Account Created
              </span>
              <p className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-medium text-slate-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400 italic">
              * Note: Profile updating functionality is currently disabled or
              managed through account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
