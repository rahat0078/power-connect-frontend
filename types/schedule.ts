export interface PowerSchedule {
  id: string
  area: string
  startTime: string
  endTime: string
  description: string
  status: string
  createdById: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ScheduleQueryParams {
  searchTerm?: string
  area?: string
  status?: string
  startDate?: string
  endDate?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}