import { Attachment as PrismaAttachment } from "../../../../../generated/prisma/client.js"
import { AttachmentUpdateManyArgs } from "../../../../../generated/prisma/models.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { QuestionAttachment } from "../../../../domain/forum/enterprise/entities/question-attachment.js"

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.questionId) {
      throw new Error("Invalid attachment type.")
    }

    return QuestionAttachment.create(
      {
        attachmentId: new UniqueEntityID(raw.id),
        questionId: new UniqueEntityID(raw.questionId),
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrismaUpdateMany(
    attachments: QuestionAttachment[]
  ): AttachmentUpdateManyArgs {
    const attachmentIds = attachments.map((attachment) =>
      attachment.id.toString()
    )

    const questionId = attachments[0].questionId.toString()

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        questionId,
      },
    }
  }
}
