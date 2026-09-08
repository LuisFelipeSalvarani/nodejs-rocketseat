import { Attachment as PrismaAttachment } from "../../../../../generated/prisma/client.js"
import { AttachmentUpdateManyArgs } from "../../../../../generated/prisma/models.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { AnswerAttachment } from "../../../../domain/forum/enterprise/entities/answer-attachment.js"

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    if (!raw.answerId) {
      throw new Error("Invalid attachment type.")
    }

    return AnswerAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        answerId: new UniqueEntityID(raw.answerId),
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrismaUpdateMany(
    attachments: AnswerAttachment[]
  ): AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) =>
      attachment.attachmentId.toString()
    )

    const answerId = attachments[0].answerId.toString()

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        answerId,
      },
    }
  }
}
