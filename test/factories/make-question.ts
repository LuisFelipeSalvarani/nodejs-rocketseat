import { faker } from "@faker-js/faker"
import { Injectable } from "@nestjs/common"
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  Question,
  QuestionProps,
} from "../../src/domain/forum/enterprise/entities/question.js"
import { PrismaQuestionMapper } from "../../src/infra/database/prisma/mappers/prisma-question-mapper.js"
import { PrismaService } from "../../src/infra/database/prisma/prisma.service.js"

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return question
}

@Injectable()
export class QuestionFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {}
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prisma.question.create({
      data: PrismaQuestionMapper.toPrisma(question),
    })

    return question
  }
}
