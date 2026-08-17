import { DomainEvents } from "../../src/core/events/domain-events.js"
import { PaginationParams } from "../../src/core/repositories/pagination-params.js"
import { AnswerAttachmentsRepository } from "../../src/domain/forum/application/repositories/answer-attachments-repository.js"
import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository.js"
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.js"

export class InMemoryAnswersRepository implements AnswersRepository {
  items: Answer[] = []

  constructor(
    private readonly answerAttachmentRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
