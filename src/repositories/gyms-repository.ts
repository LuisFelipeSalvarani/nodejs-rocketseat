import { Gym } from '../../prisma/generated/prisma/client'
import { GymCreateInput } from '../../prisma/generated/prisma/models'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(gym: GymCreateInput): Promise<Gym>
}
