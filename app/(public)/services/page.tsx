import { getMe } from "../_actions/getMe"
import { getPublicServices } from "../_actions/services"
import ServicesClient from "./services-client"

interface ServicesPageProps {
  searchParams: Promise<{
    searchTerm?: string
    minPrice?: string
    maxPrice?: string
    page?: string
    limit?: string
  }>
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const resolvedParams = await searchParams

  const page = Number(resolvedParams.page) || 1
  const limit = Number(resolvedParams.limit) || 6
  const searchTerm = resolvedParams.searchTerm || undefined
  const minPrice = resolvedParams.minPrice
    ? Number(resolvedParams.minPrice)
    : undefined
  const maxPrice = resolvedParams.maxPrice
    ? Number(resolvedParams.maxPrice)
    : undefined

  const [user, servicesResponse] = await Promise.all([
    getMe(),
    getPublicServices({
      page,
      limit,
      searchTerm,
      minPrice,
      maxPrice,
    }),
  ])

  return <ServicesClient user={user} initialResponse={servicesResponse} />
}
