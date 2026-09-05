import { Injectable } from "@nestjs/common"
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from "../../src/domain/forum/enterprise/entities/question-attachment.js"
import { PrismaService } from "../../src/infra/database/prisma/prisma.service.js"

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const questionAttachment = QuestionAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return questionAttachment
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentProps> = {}
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: questionAttachment.attachmentId.toString(),
      },
      data: {
        questionId: questionAttachment.questionId.toString(),
      },
    })

    return questionAttachment
  }
}
