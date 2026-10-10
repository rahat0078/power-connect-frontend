"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

import { fetcher } from "@/lib/fetcher"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import { RegisterFormValues, RegistrationZodSchema, VerificationFormValues, VerificationZodSchema } from "@/schemas/auth.schema"


export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<"register" | "verify">("register")
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(RegistrationZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const verifyForm = useForm<VerificationFormValues>({
    resolver: zodResolver(VerificationZodSchema),
    defaultValues: {
      otp: "",
    },
  })

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      const res = await fetcher("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      })

      toast.success(res.message || "Registration successful! Please check your email for the OTP.")
      setRegisteredEmail(data.email)
      setStep("verify")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onVerifySubmit = async (data: VerificationFormValues) => {
    setIsLoading(true)
    try {
      const res = await fetcher("/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({
          email: registeredEmail,
          otp: data.otp,
        }),
      })

      toast.success(res.message || "Email verified successfully.")
      router.push("/resident")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Verification failed. Please check your OTP.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-950">
          {step === "register" ? "Create your account" : "Verify Email"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {step === "register"
            ? "Set up your PowerConnect profile."
            : `Enter the 6-digit code sent to ${registeredEmail}`}
        </p>

        {step === "register" ? (
          <form
            onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...registerForm.register("name")}
              />
              {registerForm.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...registerForm.register("email")}
              />
              {registerForm.formState.errors.email && (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...registerForm.register("password")}
              />
              {registerForm.formState.errors.password && (
                <p className="text-xs text-red-500">
                  {registerForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Register Account
            </Button>
          </form>
        ) : (
          <form
            onSubmit={verifyForm.handleSubmit(onVerifySubmit)}
            className="mt-6 space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="otp">6-Digit OTP</Label>
              <Input
                id="otp"
                placeholder="123456"
                maxLength={6}
                className="text-center font-mono text-lg tracking-widest"
                {...verifyForm.register("otp")}
              />
              {verifyForm.formState.errors.otp && (
                <p className="text-xs text-red-500">
                  {verifyForm.formState.errors.otp.message} 
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Verify Email
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          Already registered?{" "}
          <Link className="font-medium text-blue-600 hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}