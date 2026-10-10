import Link from "next/link"
import {
  Activity,
  ClipboardList,
  FileClock,
  History,
  Home,
  LayoutDashboard,
  Pen,
  Receipt,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react"

export type UserRole = "ADMIN" | "PROVIDER" | "RESIDENT"
type NavItem = { label: string; href: string; icon: LucideIcon }
const navigation: Record<UserRole, NavItem[]> = {
  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Providers", href: "/admin/providers", icon: ShieldCheck },
    { label: "Service Requests", href: "/admin/requests", icon: ClipboardList },
    { label: "Outage Reports", href: "/admin/outage-reports", icon: Activity },
    { label: "Schedules", href: "/admin/schedules", icon: FileClock },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: History },
    { label: "Back home", href: "/", icon: Home },

  ],
  PROVIDER: [
    { label: "Dashboard", href: "/provider", icon: LayoutDashboard },
    {
      label: "Service Requests",
      href: "/provider/service-requests",
      icon: ClipboardList,
    },
    { label: "Create Service", href: "/provider/create-service", icon: Pen },
    { label: "My Services", href: "/provider/my-services", icon: Wrench },
    { label: "Profile", href: "/provider/profile", icon: Settings },
    { label: "Back home", href: "/", icon: Home },
  ],
  RESIDENT: [
    { label: "Dashboard", href: "/resident", icon: LayoutDashboard },
    {
      label: "My Service Requests",
      href: "/resident/requests",
      icon: ClipboardList,
    },
    { label: "Outage Reports", href: "/resident/reports", icon: Activity },
    { label: "Payments", href: "/resident/payments", icon: Receipt },
    { label: "Profile", href: "/resident/profile", icon: Settings },
    { label: "Back home", href: "/", icon: Home },
  ],
}
function Nav({ role }: { role: UserRole }) {
  return (
    <nav aria-label={`${role.toLowerCase()} navigation`} className="space-y-1">
      {navigation[role].map(({ label, href, icon: Icon }, i) => (
        <Link
          key={label}
          href={href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${i === 0 ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
        >
          <Icon className="size-[18px]" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Zap className="size-4" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-slate-950">
          PowerConnect
        </span>
      </div>
    </Link>
  )
}
export function Sidebar({ role }: { role: UserRole }) {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white lg:flex lg:flex-col">
      <Logo />
      <div className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Workspace
        </p>
        <Nav role={role} />
      </div>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
          <div className="flex size-8 items-center justify-center rounded-full border bg-white text-xs font-semibold text-slate-500">
            ?
          </div>
          <div>
            <p className="text-xs font-medium text-slate-700">
              Authenticated user
            </p>
            <p className="text-[11px] text-slate-500">{role}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
export function SidebarContent({ role }: { role: UserRole }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <Logo />
      <div className="flex-1 px-3 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Workspace
        </p>
        <Nav role={role} />
      </div>
    </div>
  )
}
export function getNavigation(role: UserRole) {
  return navigation[role]
}
export function roleLabel(role: UserRole) {
  return role.charAt(0) + role.slice(1).toLowerCase()
}
