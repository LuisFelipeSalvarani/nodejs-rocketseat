import { User } from '../../prisma/generated/prisma/browser'
import { UserCreateInput } from '../../prisma/generated/prisma/models'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}
