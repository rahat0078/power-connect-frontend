'use client'
import { Menu } from 'lucide-react'
import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/ui/sheet'
import { SidebarContent, type UserRole } from './sidebar'
export function MobileSidebar({ role }: { role: UserRole }) { return <Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden"><Menu /><span className="sr-only">Open navigation</span></Button></SheetTrigger><SheetContent side="left" className="w-72 p-0"><SheetTitle className="sr-only">Navigation</SheetTitle><SidebarContent role={role} /></SheetContent></Sheet> }
