import { PaginationParams } from "../../src/core/repositories/pagination-params.js"
import { QuestionCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository.js"
import { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment.js"
import { CommentWithAuthor } from "../../src/domain/forum/enterprise/entities/value-objects/comment-with-author.js"
import { InMemoryStudentsRepository } from "./in-memory-students-repository.js"

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  items: QuestionComment[] = []

  constructor(readonly studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    { page }: PaginationParams
  ) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
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

    return questionComments
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString()
    )

    this.items.splice(itemIndex, 1)
  }
}
