import { Injectable } from "@nestjs/common"
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from "../../src/domain/forum/enterprise/entities/answer-attachment.js"
import { PrismaService } from "../../src/infra/database/prisma/prisma.service.js"

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityID
) {
  const answerAttachment = AnswerAttachment.create(
    {
      attachmentId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      ...override,
    },
    id
  )

  return answerAttachment
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private readonly prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {}
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    })

    return answerAttachment
  }
}
