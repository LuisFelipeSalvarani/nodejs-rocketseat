import { AttachmentsRepository } from "../../src/domain/forum/application/repositories/attachments-repository.js"
import { Attachment } from "../../src/domain/forum/enterprise/entities/attachment.js"

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
