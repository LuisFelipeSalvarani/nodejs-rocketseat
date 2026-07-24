import { Gym } from '../../prisma/generated/prisma/client'
import { GymCreateInput } from '../../prisma/generated/prisma/models'

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gym: GymCreateInput): Promise<Gym>
}
