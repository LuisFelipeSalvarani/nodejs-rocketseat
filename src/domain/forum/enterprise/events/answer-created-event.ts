import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { DomainEvent } from "../../../../core/events/domain-event.js"
import { Answer } from "../entities/answer.js"

export class AnswerCreatedEvent implements DomainEvent {
  ocurredAt: Date
  answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}
