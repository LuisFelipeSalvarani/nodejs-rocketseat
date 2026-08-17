import { Either, left, right } from "../../../../core/either.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.js"
import { AnswerComment } from "../../enterprise/entities/answer-comment.js"
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js"
import { AnswerRepository } from "../repositories/answers-repository.js"

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return right({ answerComment })
  }
}
