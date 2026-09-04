import { Injectable } from "@nestjs/common"
import { AttachmentsRepository } from "../../../../domain/forum/application/repositories/attachments-repository.js"
import { Attachment } from "../../../../domain/forum/enterprise/entities/attachment.js"
import { PrismaAttachmentMapper } from "../mappers/prisma-attachment-mapper.js"
import { PrismaService } from "../prisma.service.js"

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attachment: Attachment) {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
