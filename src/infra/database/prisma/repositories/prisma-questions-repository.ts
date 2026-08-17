import { Injectable } from "@nestjs/common"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { QuestionsRepository } from "../../../../domain/forum/application/repositories/questions-repository.js"
import { Question } from "../../../../domain/forum/enterprise/entities/question.js"
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper.js"
import { PrismaService } from "../prisma.service.js"

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  findBySlug(_slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.")
  }

  findManyRecent(_params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.")
  }

  create(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }

  save(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }

  delete(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
