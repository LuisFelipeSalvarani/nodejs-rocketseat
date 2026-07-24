import { CheckIn } from '../../prisma/generated/prisma/client'
import { CheckInUncheckedCreateInput } from '../../prisma/generated/prisma/models'

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
}
