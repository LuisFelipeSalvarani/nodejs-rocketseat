import { Gym } from '../../prisma/generated/prisma/client'
import { GymCreateInput } from '../../prisma/generated/prisma/models'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  create(gym: GymCreateInput): Promise<Gym>
}
