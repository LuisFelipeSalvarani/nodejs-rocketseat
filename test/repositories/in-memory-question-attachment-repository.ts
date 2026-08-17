import { QuestionAttachmentsRepository } from "../../src/domain/forum/application/repositories/question-attachments-repository.js"
import { QuestionAttachment } from "../../src/domain/forum/enterprise/entities/question-attachment.js"

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId
    )

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId
    )

    this.items = questionAttachments
  }
}
