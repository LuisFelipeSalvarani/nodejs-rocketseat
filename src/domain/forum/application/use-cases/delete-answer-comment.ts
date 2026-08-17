import { Either, left, right } from "../../../../core/either.js"
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error.js"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.js"
import { AnswerCommentRepository } from "../repositories/answer-comments-repository.js"

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentUseCase {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answerComment.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right(null)
  }
}
