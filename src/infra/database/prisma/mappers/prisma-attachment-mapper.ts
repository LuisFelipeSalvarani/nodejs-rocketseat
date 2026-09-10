import {
  Prisma,
  Attachment as PrismaAttachment,
} from "../../../../../generated/prisma/client.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { Attachment } from "../../../../domain/forum/enterprise/entities/attachment.js"

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id)
    )
  }

  static toPrisma(
    attachment: Attachment
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }
}
