import { faker } from "@faker-js/faker"
import { Injectable } from "@nestjs/common"
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  Answer,
  AnswerProps,
} from "../../src/domain/forum/enterprise/entities/answer.js"
import { PrismaAnswerMapper } from "../../src/infra/database/prisma/mappers/prisma-answer-mapper.js"
import { PrismaService } from "../../src/infra/database/prisma/prisma.service.js"

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)

    await this.prisma.answer.create({
      data: PrismaAnswerMapper.toPrisma(answer),
    })

    return answer
  }
}
