"use client"

import { useState, useTransition } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import type { PowerService } from "@/types/service"
import { PublicNavbar } from "@/components/home/public-navbar"
import type { TGetMeResponse } from "@/components/home/public-navbar"
import { TApiResponse } from "@/types/apiResponse"

interface ServicesClientProps {
  user: TGetMeResponse | null
  initialResponse: TApiResponse<PowerService[]>
}
export default function ServicesClient({
  user,
  initialResponse,
}: ServicesClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Initialize input states from current URL search params
  const [search, setSearch] = useState(searchParams.get("searchTerm") || "")
  const [min, setMin] = useState(searchParams.get("minPrice") || "")
  const [max, setMax] = useState(searchParams.get("maxPrice") || "")

  const updateQueryParams = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
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
      searchTerm: search.trim() || null,
      minPrice: min === "" ? null : min,
      maxPrice: max === "" ? null : max,
      page: 1, 
    })
  }

  const resetFilters = () => {
    setSearch("")
    setMin("")
    setMax("")
    
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  const changePage = (newPage: number) => {
    updateQueryParams({ page: newPage })
  }

  const { data: services, meta } = initialResponse

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar user={user} />

      <main className="mx-auto max-w-7xl px-4 py-10">
        {/* Search & Price Inputs */}
        <div className="mb-6 grid gap-3 sm:grid-cols-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services"
            className="rounded-md border px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Minimum price"
            className="rounded-md border px-3 py-2"
          />

          <input
            type="number"
            min="0"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Maximum price"
            className="rounded-md border px-3 py-2"
          />

          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              disabled={isPending}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
            >
              {isPending ? "Searching..." : "Search"}
            </button>

            <button
              onClick={resetFilters}
              disabled={isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Showing {services.length} of {meta?.total ?? 0} services
        </p>

        {isPending && <p className="mb-4 text-sm text-muted-foreground">Updating results...</p>}

        {services.length === 0 && !isPending && (
          <p className="py-10 text-center">No services found.</p>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-lg border p-5">
              <h2 className="text-xl font-semibold">{service.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-4 rounded-lg bg-muted/60 p-4">
                <p className="font-medium">{service.provider.businessName}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.provider.address}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {service.provider.phone}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-semibold">
                  ৳ {Number(service.price).toLocaleString("en-BD")}
                </p>
                <span className="rounded-md bg-muted px-2 py-1 text-sm">
                  {service.capacity}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination controls */}
        {meta?.totalPages && meta?.totalPages > 1 && (
          <div className="mt-8 flex items-center justify-between border-t pt-5">
            <button
              onClick={() => changePage(meta.page! - 1)}
              disabled={meta.page! <= 1 || isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {meta.page} of {meta.totalPages}
            </span>

            <button
              onClick={() => changePage(meta.page! + 1)}
              disabled={meta.page! >= meta.totalPages || isPending}
              className="rounded-md border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  )
}