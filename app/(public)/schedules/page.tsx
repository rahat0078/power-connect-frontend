import { getMe } from "../_actions/getMe"
import { getRecentSchedules } from "../_actions/schedules"
import SchedulesClient from "./schedules-client"


interface SchedulesPageProps {
  searchParams: Promise<{
    searchTerm?: string
    area?: string
    status?: string
    startDate?: string
    endDate?: string
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }>
}

export default async function SchedulesPage({ searchParams }: SchedulesPageProps) {
  const resolvedParams = await searchParams

  const page = Number(resolvedParams.page) || 1
  const limit = Number(resolvedParams.limit) || 6
  const searchTerm = resolvedParams.searchTerm || undefined
  const area = resolvedParams.area && resolvedParams.area !== "all" ? resolvedParams.area : undefined
  const status = resolvedParams.status && resolvedParams.status !== "all" ? resolvedParams.status : undefined
  const startDate = resolvedParams.startDate || undefined
  const endDate = resolvedParams.endDate || undefined
  const sortOrder = resolvedParams.sortOrder || "asc"
  const sortBy = resolvedParams.sortBy || "startTime"

  const [user, schedulesResponse] = await Promise.all([
    getMe(),
    getRecentSchedules({
      page,
      limit,
      searchTerm,
      area,
      status,
      startDate,
      endDate,
      sortBy,
      sortOrder,
    }),
  ])

  return (
    <SchedulesClient
      user={user}
      initialResponse={schedulesResponse}
    />
  )
}