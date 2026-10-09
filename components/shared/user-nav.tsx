'use client'
import Link from 'next/link'
import { LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/ui/avatar'
import { Button } from '@/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu'
export function UserNav() { return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="size-9 rounded-full p-0"><Avatar className="size-9"><AvatarFallback className="bg-blue-50 text-blue-700">?</AvatarFallback></Avatar><span className="sr-only">Open user menu</span></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-48"><DropdownMenuItem asChild><Link href="/profile"><User />Profile</Link></DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem><LogOut />Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu> } 

export default UserNav
