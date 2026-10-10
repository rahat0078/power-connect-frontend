"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, ShieldCheck, User, Wrench } from "lucide-react"

import { fetcher } from "@/lib/fetcher"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { LoginFormValues, LoginZodSchema } from "@/schemas/auth.schema"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"

const DEMO_USERS = [
  {
    role: "ADMIN",
    label: "Admin",
    email: "admin@power.com",
    password: "Admin@12",
    icon: ShieldCheck,
  },
  {
    role: "PROVIDER",
    label: "Provider",
    email: "provider@powerconnect.com",
    password: "Provider@123456",
    icon: Wrench,
  },
  {
    role: "RESIDENT",
    label: "Resident",
    email: "resident@powerconnect.com",
    password: "Resident@123456",
    icon: User,
  },
] as const

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Login handler
  const handleAuth = async (credentials: LoginFormValues) => {
    setIsLoading(true)
    try {
      const res = await fetcher<{
        user: { role: string }
        accessToken?: string
        refreshToken?: string
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })

      if (res.data?.accessToken) {
        Cookies.set("accessToken", res.data.accessToken, {
          expires: 1,
          path: "/",
          sameSite: "lax",
        })
      }

      if (res.data?.refreshToken) {
        Cookies.set("refreshToken", res.data.refreshToken, {
          expires: 7,
          path: "/",
          sameSite: "lax",
        })
      }

      toast.success(res.message || "Logged in successfully!")

      const role = res.data?.user?.role

      if (
        redirectTo &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//") &&
        !redirectTo.includes("\\")
      ) {
        router.push(redirectTo)
        return
      }

      if (role === "ADMIN") {
        router.push("/admin")
      } else if (role === "PROVIDER") {
        router.push("/provider")
      } else {
        router.push("/resident")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (data: LoginFormValues) => {
    handleAuth(data)
  }

  const handleDemoLogin = async (email: string, password: string) => {
    setValue("email", email)
    setValue("password", password)

    await handleAuth({ email, password })
  }

  const handleGoogleLogin = () => {
    toast.info("Google Login integration coming soon.")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to your PowerConnect account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : null}
            Sign In
          </Button>
        </form>

        {/* 🚀 MANDATORY ONE-CLICK DEMO LOGIN BUTTONS */}
        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="mb-3 text-center text-xs font-semibold tracking-wider text-slate-500 uppercase">
            🚀 Quick Demo Login
          </p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_USERS.map((demo) => {
              const Icon = demo.icon

              return (
                <Button
                  key={demo.role}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex h-auto flex-col py-3 text-xs"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin(demo.email, demo.password)}
                >
                  <Icon className="mb-1 size-4" />
                  <span>{demo.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <svg className="mr-2 size-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to PowerConnect?{" "}
          <Link
            className="font-medium text-blue-600 hover:underline"
            href="/register"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
