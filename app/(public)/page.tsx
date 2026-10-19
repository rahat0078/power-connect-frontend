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
  Star,
  Mail,
  Phone,
  HelpCircle,
  Briefcase,
  Code2,
} from "lucide-react"
import { PublicNavbar } from "@/components/home/public-navbar"
import { getPublicServices } from "./_actions/services"
import { getRecentSchedules } from "./_actions/schedules"
import { getMe } from "./_actions/getMe"

const fallbackServices = [
  {
    id: "1",
    name: "Residential Power Setup",
    description: "Certified electrical setup and grid connection for residential properties.",
    price: "5000",
    rating: "4.9",
    location: "Dhaka Central",
  },
  {
    id: "2",
    name: "Emergency Outage Repair",
    description: "Fast-response electrical troubleshooting and emergency repair services.",
    price: "5500",
    rating: "4.8",
    location: "Uttara Zone",
  },
  {
    id: "3",
    name: "Transformer Maintenance",
    description: "Scheduled safety inspections and heavy power grid line maintenance.",
    price: "3000",
    rating: "4.7",
    location: "Mirpur Sector",
  },
  {
    id: "4",
    name: "Solar & Backup Power",
    description: "Inverter, solar panel, and battery setup for uninterrupted power.",
    price: "5400",
    rating: "5.0",
    location: "Dhanmondi Area",
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
      <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-blue-600 uppercase">
        {eyebrow}
      </p>
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{children}</p>
    </div>
  )
}

export default async function HomePage() {
  const apiServices = await getPublicServices({ limit: 4 })
  const getUser = await getMe()

  const servicesList =
    apiServices.data && apiServices.data.length > 0 ? apiServices.data : fallbackServices

  const apiSchedules = await getRecentSchedules({ limit: 3 })
  const schedulesList = apiSchedules.data || []

  return (
    <div id="top" className="min-h-screen bg-background">
      <PublicNavbar user={getUser} />
      <main>
        {/* 1. HERO SECTION (Height Limited to 60-70% screen) */}
        <section className="relative overflow-hidden border-b border-border/70 bg-muted/30 py-12 sm:py-16 lg:py-20 min-h-[65vh] flex items-center">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                Multi-Vendor Power Utility Platform
              </div>
              <h1 className="text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
                Smart Load Shedding &{" "}
                <span className="text-blue-600">Power Utility Management.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                PowerConnect seamlessly bridges residents, certified service providers, and utility administrators. Track load shedding, report outages, and request emergency electrical repairs.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                >
                  Get Started <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="#schedules"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-muted transition-all"
                >
                  <Calendar className="size-4 text-blue-600" /> Outage Schedules
                </Link>
              </div>
            </div>

            {/* HERO VISUAL CARD */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-2xl border border-border bg-background p-5 shadow-xl shadow-slate-200/50 dark:shadow-black/20">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div>
                    <p className="text-sm font-semibold">Live Grid Network</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Real-time status tracking across 3 roles</p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                    <Activity className="size-4" />
                  </span>
                </div>
                <div className="relative my-4 grid grid-cols-3 gap-2">
                  <div className="relative rounded-xl border border-border bg-background p-2.5 text-center">
                    <House className="mx-auto size-4 text-blue-600" />
                    <p className="mt-1 text-[11px] font-medium">Residents</p>
                  </div>
                  <div className="relative rounded-xl border border-blue-200 bg-blue-50/60 p-2.5 text-center dark:border-blue-900 dark:bg-blue-950/30">
                    <Zap className="mx-auto size-4 text-blue-600" />
                    <p className="mt-1 text-[11px] font-medium">PowerConnect</p>
                  </div>
                  <div className="relative rounded-xl border border-border bg-background p-2.5 text-center">
                    <Building2 className="mx-auto size-4 text-blue-600" />
                    <p className="mt-1 text-[11px] font-medium">Providers</p>
                  </div>
                </div>
                <div className="rounded-xl bg-blue-50/70 p-3 dark:bg-blue-950/30">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="size-4 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold">Automated Service Lifecycle</p>
                      <p className="text-[11px] text-muted-foreground">Request → Accept → Stripe Payment → Resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATISTICS SECTION */}
        <section className="border-b border-border bg-background py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">99.8%</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Grid Uptime Monitored</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">1,240+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Outages Resolved</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">150+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Verified Technicians</p>
            </div>
            <div className="p-3">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">15,000+</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Active Residents</p>
            </div>
          </div>
        </section>

        {/* 3. OUTAGE & SCHEDULES SECTION */}
        <section id="schedules" className="border-b border-border/70 bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Power Grid Schedules" title="Load Shedding & Maintenance Alerts">
            Stay updated with official area-wise load shedding timetables and scheduled power maintenance.
          </SectionHeading>

          <div className="mx-auto mt-8 max-w-5xl">
            {schedulesList.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {schedulesList.map((schedule) => (
                  <div key={schedule.id} className="rounded-xl border border-border bg-card p-4 shadow-xs">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                        <AlertTriangle className="size-3" />
                        {schedule.status || "SCHEDULED"}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3" /> Area Timetable
                      </span>
                    </div>
                    <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                      <MapPin className="size-4 text-blue-600" />
                      {schedule.area}
                    </h3>
                    <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                      <p><strong className="text-foreground">Start:</strong> {new Date(schedule.startTime).toLocaleString()}</p>
                      <p><strong className="text-foreground">End:</strong> {new Date(schedule.endTime).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
                <Zap className="mx-auto mb-1.5 size-6 text-muted-foreground/60" />
                <p className="text-xs font-medium text-muted-foreground">
                  No active load shedding alerts currently reported in your sector.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. CORE SERVICES GRID SECTION (4 cards per row, uniform height) */}
        <section id="services" className="border-b border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Certified Services" title="Popular Power & Electrical Solutions">
            Browse top-rated electrical maintenance and solar packages with transparent pricing.
          </SectionHeading>

          <div className="mx-auto mt-8 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-xs hover:border-blue-500 transition-all duration-200 min-h-55"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                      <Plug className="size-4" />
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-500">
                      <Star className="size-3.5 fill-amber-500" /> {service.rating || "4.9"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-foreground line-clamp-1">{service.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600">৳{service.price}</span>
                  <Link href="/login" className="font-semibold text-primary group-hover:text-blue-600 transition-colors">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. SERVICE CATEGORIES */}
        <section className="border-b border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Categories" title="Explore Utility Categories">
            Tailored electrical solutions for every scale and requirement.
          </SectionHeading>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ["Solar & Green Energy", "12 Active Packages", Zap],
              ["Emergency Repairs", "24/7 Technician Duty", Wrench],
              ["Industrial Power", "High Voltage Support", Building2],
              ["Residential Wiring", "Certified Engineers", House],
            ].map(([title, subtitle, Icon]) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const CategoryIcon = Icon as any
              return (
                <div key={title as string} className="p-4 rounded-xl border border-border bg-card text-center hover:shadow-sm transition-all">
                  <div className="mx-auto size-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 mb-2">
                    <CategoryIcon className="size-5" />
                  </div>
                  <h4 className="text-xs font-bold text-foreground">{title as string}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle as string}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 6. ABOUT PLATFORM */}
        <section id="about" className="border-b border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Ecosystem" title="Unified Power Ecosystem">
            PowerConnect connects residents, electrical partners, and administrators under one roof.
          </SectionHeading>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              [Users, "Residents", "Request electrical repairs, track local power outages, and pay securely via Stripe."],
              [Wrench, "Service Providers", "List utility services, accept incoming client requests, and perform field repairs."],
              [ShieldCheck, "Administrators", "Publish area load shedding timetables, verify providers, and oversee platform logs."],
            ].map(([Icon, title, text]) => (
              <div key={title as string} className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-sm font-bold">{title as string}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{text as string}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. LIFECYCLE FLOW */}
        <section id="how-it-works" className="border-b border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Workflow" title="How Service Booking Works">
            Transparent 4-step workflow from initial request to resolution.
          </SectionHeading>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-4">
            {[
              ["01", "Request Service", "Select a power package or repair service."],
              ["02", "Provider Accepts", "Certified provider confirms booking."],
              ["03", "Stripe Checkout", "Complete payment securely via Stripe."],
              ["04", "Execution", "Technician completes electrical work."],
            ].map(([num, title, text]) => (
              <div key={num} className="border-l-2 border-blue-600 pl-4 py-1">
                <p className="text-xs font-bold text-blue-600">{num}</p>
                <h3 className="text-xs font-bold mt-1">{title}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. TESTIMONIALS */}
        <section className="border-b border-border bg-background px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Feedback" title="What Our Community Says">
            Trusted by thousands of households and utility engineers.
          </SectionHeading>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              ["Tanvir Ahmed", "Resident, Mirpur", "PowerConnect made tracking load shedding schedules effortless. Quick repair booking too!"],
              ["Rahim Electronics", "Service Provider", "Managing electrical service requests and receiving instant online payments is super smooth."],
              ["Sultana Parveen", "Resident, Dhanmondi", "Emergency outage repair technician arrived within 45 minutes. Fantastic service!"],
            ].map(([name, role, quote]) => (
              <div key={name} className="rounded-xl border border-border bg-card p-4 shadow-xs">
                <div className="flex text-amber-500 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-3 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">{quote}</p>
                <div className="mt-3 pt-2 border-t border-border">
                  <p className="text-xs font-bold">{name}</p>
                  <p className="text-[10px] text-muted-foreground">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. FAQ ACCORDION */}
        <section className="border-b border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions">
            Got questions about load shedding alerts or service requests?
          </SectionHeading>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {[
              ["How do I report a power outage in my area?", "Log in as a Resident, navigate to Outage Reports, and submit your location details."],
              ["How does Stripe payment work?", "Once a provider accepts your service request, a 'Pay Now' button appears on your dashboard."],
              ["How can I become a verified Provider?", "Apply via the Resident dashboard by providing business name, phone, and address."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-xl border border-border bg-card p-4">
                <h4 className="text-xs font-bold flex items-center gap-2">
                  <HelpCircle className="size-3.5 text-blue-600" /> {q}
                </h4>
                <p className="text-xs text-muted-foreground mt-1.5 pl-5">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. NEWSLETTER & CTA */}
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-2xl bg-primary px-6 py-10 text-center text-primary-foreground">
            <h2 className="text-2xl font-bold sm:text-3xl">Get Instant Power Outage Alerts</h2>
            <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm text-primary-foreground/80">
              Subscribe to localized SMS and email updates regarding maintenance timetables.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-md bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground w-full focus:outline-none"
              />
              <button className="rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-sm">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" fill="currentColor" />
              </span>
              PowerConnect
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Multi-Vendor Power Utility & Load Shedding Management Platform.
            </p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
          
              <Link href="#" className="hover:text-primary"><Briefcase className="size-4" /></Link>
              <Link href="#" className="hover:text-primary"><Code2 className="size-4" /></Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Navigation</h3>
            <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
              <Link href="#services" className="hover:text-foreground">Services</Link>
              <Link href="#schedules" className="hover:text-foreground">Outage Schedules</Link>
              <Link href="#how-it-works" className="hover:text-foreground">Lifecycle Flow</Link>
              <Link href="#about" className="hover:text-foreground">About Ecosystem</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Portals</h3>
            <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
              <Link href="/login" className="hover:text-foreground">Demo Login</Link>
              <Link href="/register" className="hover:text-foreground">Register Account</Link>
              <Link href="/resident" className="hover:text-foreground">Resident Portal</Link>
              <Link href="/provider" className="hover:text-foreground">Provider Portal</Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Contact Utility</h3>
            <div className="mt-3 space-y-2 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><MapPin className="size-3.5 text-blue-600" /> Kurigram Sadar, Rangpur</p>
              <p className="flex items-center gap-2"><Phone className="size-3.5 text-blue-600" /> +880 1800-POWER</p>
              <p className="flex items-center gap-2"><Mail className="size-3.5 text-blue-600" /> support@powerconnect.com</p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 PowerConnect Platform. All rights reserved.
        </div>
      </footer>
    </div>
  )
}