"use client"

import Link from "next/link"
import { Menu, Zap } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { logout } from "@/app/(public)/_actions/logout"

export interface TGetMeResponse {
  id: string
  name: string
  email: string
  role: "ADMIN" | "PROVIDER" | "RESIDENT"
  googleId: string | null
  authProvider: "CREDENTIAL" | "GOOGLE"
  status: "ACTIVE" | "INACTIVE" | "BLOCKED"
  emailVerified: boolean
  isDeleted: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export function PublicNavbar({ user }: { user: TGetMeResponse | null }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  console.log(user?.id)

  const handleLogout = async () => {
    try {
      setOpen(false)

      await logout()

      router.replace("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const links = [
    ["Home", "/"],
    ["Outage Schedule", "/schedules"],
    ["Services", "/services"],
    ["How It Works", "/how-it-works"]
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="PowerConnect home"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-5" fill="currentColor" />
          </span>
          <span className="text-lg">
            Power<span className="text-blue-600">Connect</span>
          </span>
        </Link>
        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {user ? (
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={
                user.role === "ADMIN"
                  ? "/admin"
                  : user.role === "PROVIDER"
                    ? "/provider"
                    : "/resident"
              }
              onClick={() => setOpen(false)}
              className="hover/90 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-colors"
            >
              Dashboard
            </Link>

            <button
              type="button"
              onClick={async () => {
                setOpen(false)
                await handleLogout()
              }}
              className="rounded-md border border-border px-3 py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
            >
              Register
            </Link>
          </div>
        )}

        <button
          type="button"
          className="rounded-md p-2 text-foreground hover:bg-muted md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Menu className="size-5" />
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm hover:bg-muted"
              >
                {label}
              </Link>
            ))}
            {user?.id ? (
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Link
                  href={
                    user.role === "ADMIN"
                      ? "/admin"
                      : user.role === "PROVIDER"
                        ? "/provider"
                        : "/resident"
                  }
                  onClick={() => setOpen(false)}
                  className="hover/90 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground transition-colors"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={async () => {
                    setOpen(false)
                    await handleLogout()
                  }}
                  className="rounded-md border border-border px-3 py-2 text-center text-sm font-medium transition-colors hover:bg-muted"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-border px-3 py-2 text-center text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
