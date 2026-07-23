import { CheckIn } from '../../prisma/generated/prisma/browser'
import { CheckInUncheckedCreateInput } from '../../prisma/generated/prisma/models'

export interface CheckInsRepository {
  create(data: CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
