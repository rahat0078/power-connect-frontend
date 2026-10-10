"use client"

import Link from "next/link"
import { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  AlertTriangleIcon,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
} from "lucide-react"

import type { PowerSchedule } from "@/types/schedule"
import type { TApiResponse } from "@/types/apiResponse"
import { PublicNavbar, type TGetMeResponse } from "@/components/home/public-navbar"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { Input } from "@/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"
import { Alert, AlertDescription } from "@/ui/alert"

interface SchedulesClientProps {
  user: TGetMeResponse | null
  initialResponse: TApiResponse<PowerSchedule[]>
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value))

export default function SchedulesClient({
  user,
  initialResponse,
}: SchedulesClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Initialize input state from searchParams
  const [query, setQuery] = useState(searchParams.get("searchTerm") || "")
  const [area, setArea] = useState(searchParams.get("area") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [start, setStart] = useState(searchParams.get("startDate") || "")
  const [end, setEnd] = useState(searchParams.get("endDate") || "")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("sortOrder") as "asc" | "desc") || "asc"
  )

  const updateQueryParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined || value === "all") {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const applyFilters = () => {
    updateQueryParams({
      searchTerm: query.trim() || null,
      area,
      status,
      startDate: start || null,
      endDate: end || null,
      sortOrder,
      sortBy: "startTime",
      page: 1, // Reset to first page when filtering
    })
  }

  const resetFilters = () => {
    setQuery("")
    setArea("all")
    setStatus("all")
    setStart("")
    setEnd("")
    setSortOrder("asc")

    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  const changePage = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  const schedules = initialResponse.data ?? []
  const meta = initialResponse.meta ?? {
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  }

  // Unique list of areas from fetched data for filter dropdown
  const uniqueAreas = Array.from(
    new Set(schedules.map((s) => s.area).filter(Boolean))
  )

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar user={user} />
      <main>
        <section className="border-b border-border bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Grid updates
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Power Outage & Maintenance Schedules
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stay updated with official area-wise load shedding timetables and
              grid maintenance alerts.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <CardContent className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <label className="flex flex-col gap-2 text-sm font-medium xl:col-span-2">
                Search
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search area or maintenance"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Area
                <Select value={area} onValueChange={(val) => setArea(val ?? "")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All areas</SelectItem>
                    {uniqueAreas.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Status
                <Select value={status} onValueChange={(val) => setStatus(val ?? "")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                From
                <Input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                To
                <Input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium xl:col-span-2">
                Sort Order
                <Select
                  value={sortOrder}
                  onValueChange={(val: "asc" | "desc" | null) => setSortOrder(val ?? "asc")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Earliest first</SelectItem>
                    <SelectItem value="desc">Latest first</SelectItem>
                  </SelectContent>
                </Select>
              </label>

              <div className="flex items-end gap-2 xl:col-span-4">
                <Button
                  onClick={applyFilters}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  {isPending ? "Filtering..." : "Apply Filters"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  disabled={isPending}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Alert className="mb-5 max-w-xl border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
            <AlertTriangleIcon className="size-4" />
            <AlertDescription>
              Notice a localized outage not listed?{" "}
              <Link
                className="font-medium underline underline-offset-4"
                href="/login"
              >
                Log in to report an emergency outage.
              </Link>
            </AlertDescription>
          </Alert>

          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {schedules.length} of {meta.total ?? 0} schedules
            </p>
            <Search className="size-4 text-muted-foreground" />
          </div>

          {isPending && (
            <p className="mb-4 text-sm text-muted-foreground">
              Updating schedules...
            </p>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            {schedules.map((item) => (
              <Card key={item.id ?? `${item.area}-${item.startTime}`}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <MapPin className="size-4 text-blue-600" />
                        {item.area}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === "SCHEDULED" ? "secondary" : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-lg bg-muted/60 p-3 text-sm">
                    <CalendarDays className="size-4 text-blue-600" />
                    <span>
                      {formatDate(item.startTime)} –{" "}
                      {formatDate(item.endTime).split(", ").slice(-1)[0]}
                    </span>
                  </div>
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="size-3.5" />
                    Official schedule update
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {!schedules.length && !isPending && (
            <Card className="mt-4">
              <CardContent className="py-14 text-center text-sm text-muted-foreground">
                No schedules match the selected filters.
              </CardContent>
            </Card>
          )}

          {/* Pagination Controls */}
          {meta.totalPages !== undefined && meta.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-between border-t border-border pt-5 text-sm text-muted-foreground">
              <span>
                Page {meta.page} of {meta.totalPages} · Total: {meta.total}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changePage((meta.page ?? 1) - 1)}
                  disabled={(meta.page ?? 1) <= 1 || isPending}
                >
                  <ChevronLeft />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changePage((meta.page ?? 1) + 1)}
                  disabled={
                    (meta.page ?? 1) >= (meta.totalPages ?? 1) || isPending
                  }
                >
                  Next
                  <ChevronRight />
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}