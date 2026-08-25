import { Injectable } from "@nestjs/common"
import { QuestionAttachmentsRepository } from "../../../../domain/forum/application/repositories/question-attachments-repository.js"
import { PrismaQuestionAttachmentMapper } from "../mappers/prisma-question-attachment-mapper.js"
import { PrismaService } from "../prisma.service.js"

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByQuestionId(questionId: string) {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })

    return attachments.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteManyByQuestionId(questionId: string) {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
