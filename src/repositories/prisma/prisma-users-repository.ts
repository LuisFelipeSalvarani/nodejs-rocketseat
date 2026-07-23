import { prisma } from '@/lib/prisma'
import { UserCreateInput } from '../../../prisma/generated/prisma/models'
import { UsersRepository } from '../users-repository'
import { User } from '../../../prisma/generated/prisma/browser'

export class PrismaUsersRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
