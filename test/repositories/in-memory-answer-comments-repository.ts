import { PaginationParams } from "../../src/core/repositories/pagination-params.js"
import { AnswerCommentsRepository } from "../../src/domain/forum/application/repositories/answer-comments-repository.js"
import { AnswerComment } from "../../src/domain/forum/enterprise/entities/answer-comment.js"
import { CommentWithAuthor } from "../../src/domain/forum/enterprise/entities/value-objects/comment-with-author.js"
import { InMemoryStudentsRepository } from "./in-memory-students-repository.js"

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  items: AnswerComment[] = []

  constructor(readonly studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams
  ) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) =>
          student.id.equals(comment.authorId)
        )

        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId.toString()}" does not exist.`
          )
        }

        return CommentWithAuthor.create({
          content: comment.content,
          commentId: comment.id,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        })
      })

    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString()
    )

    this.items.splice(itemIndex, 1)
  }
}
