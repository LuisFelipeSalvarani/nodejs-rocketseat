import { faker } from "@faker-js/faker"

import { UniqueEntityID } from "../../src/core/entities/unique-entity-id.js"
import {
  QuestionComment,
  QuestionCommentProps,
} from "../../src/domain/forum/enterprise/entities/question-comment.js"

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id
  )

  return questionComment
}
