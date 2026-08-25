import { Injectable } from "@nestjs/common"
import { AnswerAttachmentsRepository } from "../../../../domain/forum/application/repositories/answer-attachments-repository.js"
import { PrismaAnswerAttachmentMapper } from "../mappers/prisma-answer-attachment-mapper.js"
import { PrismaService } from "../prisma.service.js"

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findManyByAnswerId(answerId: string) {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    })

    return attachments.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteManyByAnswerId(answerId: string) {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }
}
