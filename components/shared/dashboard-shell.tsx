import { Navbar } from './navbar'
import { Sidebar, type UserRole } from './sidebar'
export function DashboardShell({ role, title, children }: { role: UserRole; title: string; children: React.ReactNode }) { return <div className="flex min-h-screen bg-slate-50"><Sidebar role={role} /><div className="flex min-w-0 flex-1 flex-col"><Navbar role={role} title={title} /><main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main></div></div> }
