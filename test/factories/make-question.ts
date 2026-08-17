import { faker } from "@faker-js/faker"

import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  Question,
  QuestionProps,
} from "../../src/domain/forum/enterprise/entities/question.js"

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return question
}
