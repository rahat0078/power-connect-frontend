export interface PowerServiceProvider {
  id: string
  address: string
  businessName: string
  phone: string
}

export interface PowerService {
  id: string
  providerId: string
  name: string
  description: string
  price: string
  capacity: string
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  provider: PowerServiceProvider
}

export interface ServiceQueryParams {
  searchTerm?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}