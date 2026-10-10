"use client"

import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  ListChecks,
  MapPinned,
  Search,
  ShieldCheck,
  UserRound,
  Wrench,
  AlertTriangle,
} from "lucide-react"
import { PublicNavbar, type TGetMeResponse } from "@/components/home/public-navbar"
import { Card, CardContent } from "@/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs"

interface HowItWorksClientProps {
  user: TGetMeResponse | null
}

const workflows = {
  residents: {
    label: "Residents",
    icon: UserRound,
    steps: [
      [
        Search,
        "Discover & View Schedules",
        "Browse certified service providers and check official area-wise load shedding timetables.",
      ],
      [
        AlertTriangle,
        "Report Emergency Outages",
        "Submit reports for unexpected load shedding or local outages so admins can review and update statuses.",
      ],
      [
        CreditCard,
        "Book & Pay Securely",
        "Request services, review provider acceptance, and complete secure payments via Stripe.",
      ],
      [
        MapPinned,
        "Track to Completion",
        "Follow progress in real time until your service request is fully resolved.",
      ],
    ],
  },
  providers: {
    label: "Service Providers",
    icon: Wrench,
    steps: [
      [
        FileCheck2,
        "Apply for Verification",
        "Build a trusted profile with verified business details and service credentials.",
      ],
      [
        ListChecks,
        "List Your Services",
        "Manage and showcase your electrical, solar, and maintenance offerings.",
      ],
      [
        ShieldCheck,
        "Handle Requests",
        "Review incoming customer service requests with clear context and accept or decline.",
      ],
      [
        BarChart3,
        "Complete & Earn",
        "Finish jobs, build your professional history, and track your earnings.",
      ],
    ],
  },
  administrators: {
    label: "Administrators",
    icon: ShieldCheck,
    steps: [
      [
        CalendarDays,
        "Publish Schedules",
        "Keep official area-wise maintenance timetables and grid load-shedding schedules up to date.",
      ],
      [
        BadgeCheck,
        "Verify Providers",
        "Review provider verification applications to maintain a trusted ecosystem.",
      ],
      [
        ShieldCheck,
        "Oversee & Resolve Outages",
        "Review resident-reported emergency outages, update their statuses, and oversee operations.",
      ],
      [
        BarChart3,
        "Audit & Analyze",
        "Use system logs and operational analytics to guide platform oversight.",
      ],
    ],
  },
} 

export default function HowItWorksClient({ user }: HowItWorksClientProps) {
  const [role, setRole] = useState<keyof typeof workflows>("residents")

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar user={user} />
      <main>
        <section className="border-b border-border bg-muted/30 px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              A connected ecosystem
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              How PowerConnect Works
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              A transparent multi-vendor ecosystem connecting Residents, Power
              Service Providers, and Administrators.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Tabs
            value={role}
            onValueChange={(value) => setRole(value as keyof typeof workflows)}
          >
            <TabsList className="mx-auto grid h-auto max-w-2xl grid-cols-3">
              <TabsTrigger value="residents">Residents</TabsTrigger>
              <TabsTrigger value="providers">Providers</TabsTrigger>
              <TabsTrigger value="administrators">Administrators</TabsTrigger>
            </TabsList>

            {(Object.keys(workflows) as Array<keyof typeof workflows>).map(
              (key) => {
                const flow = workflows[key]
                return (
                  <TabsContent key={key} value={key} className="mt-10">
                    <div className="mb-10 text-center">
                      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
                        <flow.icon className="size-6" />
                      </div>
                      <h2 className="mt-4 text-2xl font-semibold">
                        For {flow.label}
                      </h2>
                      <p className="mt-2 text-muted-foreground">
                        A clear path from first action to finished work.
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-4">
                      {flow?.steps?.map(([Icon, title, text], index) => (
                        <Card key={title as string} className="relative">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-blue-600">
                                0{index + 1}
                              </span>
                              <Icon className="size-5 text-blue-600" />
                            </div>
                            <h3 className="mt-6 font-semibold">{title as string}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {text as string}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                )
              }
            )}
          </Tabs>
        </section>

        <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Request lifecycle
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                A transparent path from request to resolution
              </h2>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                [
                  ClipboardCheck,
                  "Pending Request",
                  "Your service need is submitted and ready for provider review.",
                ],
                [
                  BadgeCheck,
                  "Provider Accepted",
                  "A verified provider accepts the work and next steps are clear.",
                ],
                [
                  CreditCard,
                  "Stripe Payment Completed",
                  "Payment is completed securely before the job begins.",
                ],
                [
                  CheckCircle2,
                  "Job Finished",
                  "The provider completes the work and the request is resolved.",
                ],
              ].map(([Icon, title, text], index) => (
                <div
                  key={title as string}
                  className="relative rounded-xl border border-border bg-background p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600">
                      0{index + 1}
                    </span>
                    <Icon className="size-5 text-blue-600" />
                  </div>
                  <h3 className="mt-6 font-semibold">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {text as string}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-3xl font-semibold">Ready to get started?</h2>
              <p className="mt-2 text-primary-foreground/70">
                Join the connected power service ecosystem today.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90"
              >
                Create an account <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/30 px-4 py-2 text-sm font-medium hover:bg-primary-foreground/10"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}