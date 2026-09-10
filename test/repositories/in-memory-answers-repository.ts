import { DomainEvents } from "../../src/core/events/domain-events.js"
import { PaginationParams } from "../../src/core/repositories/pagination-params.js"
import { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository.js"
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.js"
import { InMemoryAnswerAttachmentsRepository } from "./in-memory-answer-attachments-repository.js"

export class InMemoryAnswersRepository implements AnswersRepository {
  items: Answer[] = []

  constructor(
    private readonly answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
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

    this.answerAttachmentsRepository.createMany(answer.attachments.getItems())
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)

    this.answerAttachmentsRepository.createMany(
      answer.attachments.getNewItems()
    )

    this.answerAttachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems()
    )
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }
}
