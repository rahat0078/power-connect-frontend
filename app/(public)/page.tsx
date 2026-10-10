import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  House,
  MapPin,
  Plug,
  ShieldCheck,
  Users,
  Wrench,
  Zap,
} from "lucide-react"
import { PublicNavbar } from "@/components/home/public-navbar"
import { getPublicServices } from "./_actions/services"
import { getRecentSchedules } from "./_actions/schedules"
import { getMe } from "./_actions/getMe"

const fallbackServices = [
  {
    id: "1",
    name: "Residential Power Installation",
    description:
      "Certified electrical setup and connection services for residential properties.",
    price: "5000",
  },
  {
    id: "2",
    name: "Emergency Outage Repair",
    description:
      "Fast-response electrical troubleshooting and emergency repair services.",
    price: "5500",
  },
  {
    id: "3",
    name: "Transformer & Line Maintenance",
    description:
      "Scheduled safety inspections and heavy power grid maintenance.",
    price: "3000",
  },
  {
    id: "4",
    name: "Solar & Backup Power Solutions",
    description:
      "Inverter, solar panel, and generator setup for uninterruptible power supply.",
    price: "5400",
  },
  {
    id: "5",
    name: "Industrial Connection Services",
    description:
      "High-voltage grid connection and commercial load utility support.",
    price: "8500",
  },
  {
    id: "6",
    name: "Substation & Safety Audits",
    description:
      "Comprehensive power safety, ground checks, and compliance reporting.",
    price: "9550",
  },
]

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-muted-foreground">{children}</p>
    </div>
  )
}

export default async function HomePage() {
  const apiServices = await getPublicServices({ limit: 6 })
  const getUser = await getMe()

  const servicesList =
    apiServices.data.length > 0 ? apiServices.data : fallbackServices

  const apiSchedules = await getRecentSchedules({ limit: 3 })

  const schedulesList = apiSchedules.data

  return (
    <div id="top" className="min-h-screen bg-background">
      <PublicNavbar user={getUser} />{" "}
      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-border/70 bg-muted/30">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-blue-600" />
                Multi-Vendor Power Utility & Service Platform
              </div>
              <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight sm:text-6xl">
                Smart Load Shedding &{" "}
                <span className="text-blue-600">Power Utility Management.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                PowerConnect seamlessly bridges residents, certified service
                providers, and utility administrators. Track load shedding,
                report outages, and request emergency electrical repairs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  Get Started <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/schedules"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-muted"
                >
                  <Calendar className="size-4 text-blue-600" /> View Outage
                  Schedules
                </Link>
              </div>
            </div>

            {/* HERO VISUAL CARD */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-2xl border border-border bg-background p-5 shadow-xl shadow-slate-200/60 dark:shadow-black/20">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="text-sm font-semibold">
                      Live Grid Network & Services
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Real-time status tracking across 3 roles
                    </p>
                  </div>
                  <span className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                    <Activity className="size-5" />
                  </span>
                </div>
                <div className="relative my-5 grid grid-cols-3 gap-3">
                  <div className="absolute top-1/2 right-[16%] left-[16%] border-t border-dashed border-blue-200 dark:border-blue-900" />
                  <div className="relative rounded-xl border border-border bg-background p-3 text-center">
                    <House className="mx-auto size-5 text-blue-600" />
                    <p className="mt-2 text-xs font-medium">Residents</p>
                  </div>
                  <div className="relative rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-center dark:border-blue-900 dark:bg-blue-950/30">
                    <Zap className="mx-auto size-5 text-blue-600" />
                    <p className="mt-2 text-xs font-medium">PowerConnect</p>
                  </div>
                  <div className="relative rounded-xl border border-border bg-background p-3 text-center">
                    <Building2 className="mx-auto size-5 text-blue-600" />
                    <p className="mt-2 text-xs font-medium">Providers</p>
                  </div>
                </div>
                <div className="rounded-xl bg-blue-50/70 p-4 dark:bg-blue-950/30">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">
                        Automated Service Lifecycle
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Request → Accept → Stripe Payment → Resolution
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUTAGE & LOAD SHEDDING SCHEDULES SECTION */}
        <section
          id="schedules"
          className="border-b border-border/70 bg-background px-4 py-16 sm:px-6 lg:px-8"
        >
          <SectionHeading
            eyebrow="Power Grid Schedules"
            title="Load Shedding & Maintenance Alerts"
          >
            Stay updated with official area-wise load shedding timetables and
            scheduled power maintenance.
          </SectionHeading>

          <div className="mx-auto mt-10 max-w-5xl">
            {schedulesList.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {schedulesList.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-xl border border-border bg-card p-5 shadow-xs"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                        <AlertTriangle className="size-3.5" />
                        {schedule.status || "SCHEDULED"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" /> Area Timetable
                      </span>
                    </div>
                    <h3 className="flex items-center gap-2 text-base font-semibold">
                      <MapPin className="size-4 text-blue-600" />
                      {schedule.area}
                    </h3>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Start:</strong>{" "}
                        {new Date(schedule.startTime).toLocaleString()}
                      </p>
                      <p>
                        <strong className="text-foreground">End:</strong>{" "}
                        {new Date(schedule.endTime).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-muted/20 p-8 text-center">
                <Zap className="mx-auto mb-2 size-8 text-muted-foreground/60" />
                <p className="text-sm font-medium text-muted-foreground">
                  No active load shedding alerts currently reported. Check back
                  later or log in to report a localized outage.
                </p>
              </div>
            )}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
              >
                Log in as Resident to Report Power Outage in Your Area{" "}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The Platform"
            title="Unified Power Service Ecosystem"
          >
            PowerConnect brings residents, certified electrical technicians, and
            power utility admins into one structured workflow.
          </SectionHeading>
          <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {[
              [
                Users,
                "Residents",
                "Explore power services, request repairs, report local outages, pay securely via Stripe, and track history.",
              ],
              [
                Wrench,
                "Service Providers",
                "Apply for verification, list utility services, accept client requests, and manage active service jobs.",
              ],
              [
                ShieldCheck,
                "Administrators",
                "Publish load shedding timetables, verify provider applications, oversee outage reports, and monitor platform logs.",
              ],
            ].map(([Icon, title, text]) => (
              <div
                key={title as string}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text as string}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section
          id="services"
          className="border-y border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8"
        >
          <SectionHeading
            eyebrow="Power Services"
            title="Certified Utility & Electrical Services"
          >
            Browse available power services provided by certified electrical
            engineering partners and technicians.
          </SectionHeading>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-background p-5 transition-colors hover:border-blue-200 dark:hover:border-blue-900"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-blue-600">
                      <Plug className="size-5" />
                    </span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="mt-5 font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                {service.price && (
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs font-semibold text-blue-600">
                    <span>Est. Fee: ${service.price}</span>
                    <span>Book Service →</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Lifecycle Flow"
            title="How Power Service Requests Work"
          >
            A clear 4-step process ensures complete transparency from booking to
            electrical repair completion.
          </SectionHeading>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 md:grid-cols-4">
            {[
              [
                "01",
                "Request Service",
                "Resident selects an electrical or power service and submits a request.",
              ],
              [
                "02",
                "Provider Accept",
                "A verified provider reviews and accepts the pending service request.",
              ],
              [
                "03",
                "Stripe Checkout",
                "Resident completes secure test mode payment via Stripe API.",
              ],
              [
                "04",
                "Execution & Complete",
                "Provider conducts repair work and completes the request cycle.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="border-l-2 border-blue-600 px-5 py-2"
              >
                <p className="text-sm font-semibold text-blue-600">{number}</p>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="px-4 pt-10 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Need Electrical Support or Want to Report an Outage?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/75">
              Access one-click demo credentials to test Resident, Provider, or
              Admin features instantly.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-md bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-background/90"
              >
                One-Click Demo Login
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-medium hover:bg-primary-foreground/10"
              >
                Create New Account
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" fill="currentColor" />
              </span>
              PowerConnect
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Multi-Vendor Power Utility & Load Shedding Management Platform.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Platform Navigation</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="#services" className="hover:text-foreground">
                Services
              </Link>
              <Link href="#schedules" className="hover:text-foreground">
                Outage Timetables
              </Link>
              <Link href="#how-it-works" className="hover:text-foreground">
                Service Lifecycle
              </Link>
              <Link href="#about" className="hover:text-foreground">
                About Platform
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Portals</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-foreground">
                One-Click Demo Login
              </Link>
              <Link href="/register" className="hover:text-foreground">
                Register Account
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-border pt-6 text-sm text-muted-foreground">
          © 2026 PowerConnect Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
