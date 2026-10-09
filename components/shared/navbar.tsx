import { Bell } from 'lucide-react'
import { Button } from '@/ui/button'
import { Separator } from '@/ui/separator'
import { MobileSidebar } from './mobile-sidebar'
import { UserNav } from './user-nav'
import type { UserRole } from './sidebar'
export function Navbar({ role, title }: { role: UserRole; title: string }) { return <header className="flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6"><div className="flex items-center gap-3"><MobileSidebar role={role} /><Separator orientation="vertical" className="hidden h-5 lg:block" /><h1 className="text-sm font-semibold text-slate-900 sm:text-base">{title}</h1></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="size-[18px]" /></Button><UserNav /></div></header> }
