import {
  Attachment as PrismaAttachment,
  Question as PrismaQuestion,
  User as PrismaUser,
} from "../../../../../generated/prisma/client.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { QuestionDetails } from "../../../../domain/forum/enterprise/entities/value-objects/question-details.js"
import { Slug } from "../../../../domain/forum/enterprise/entities/value-objects/slug.js"
import { PrismaAttachmentMapper } from "./prisma-attachment-mapper.js"

type PrismaQuestionDetails = PrismaQuestion & {
  author: PrismaUser
  attachments: PrismaAttachment[]
}

export class PrismaQuestionDetailsMapper {
  static toDomain(raw: PrismaQuestionDetails): QuestionDetails {
    return QuestionDetails.create({
      questionId: new UniqueEntityID(raw.id),
      authorId: new UniqueEntityID(raw.authorId),
      author: raw.author.name,
      title: raw.title,
      slug: Slug.create(raw.slug),
      content: raw.content,
      attachments: raw.attachments.map(PrismaAttachmentMapper.toDomain),
      bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.authorId) : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
