import { Injectable } from "@nestjs/common"
import { DomainEvents } from "../../../../core/events/domain-events.js"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { AnswerAttachmentsRepository } from "../../../../domain/forum/application/repositories/answer-attachments-repository.js"
import { AnswersRepository } from "../../../../domain/forum/application/repositories/answers-repository.js"
import { Answer } from "../../../../domain/forum/enterprise/entities/answer.js"
import { PrismaAnswerMapper } from "../mappers/prisma-answer-mapper.js"
import { PrismaService } from "../prisma.service.js"

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    })

    if (!answer) {
      return null
    }

    return PrismaAnswerMapper.toDomain(answer)
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = await this.prisma.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }

  async create(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data,
    })

    await this.answerAttachmentsRepository.createMany(
      answer.attachments.getItems()
    )

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: answer.id.toString(),
        },
        data,
      }),
      this.answerAttachmentsRepository.createMany(
        answer.attachments.getNewItems()
      ),
      this.answerAttachmentsRepository.deleteMany(
        answer.attachments.getRemovedItems()
      ),
    ])

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    await this.prisma.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }
}
