import { Either, left, right } from "../../../../core/either.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.js"
import { QuestionComment } from "../../enterprise/entities/question-comment.js"
import { QuestionCommentRepository } from "../repositories/question-comments-repository.js"
import { QuestionRepository } from "../repositories/questions-repository.js"

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly questionCommentRepository: QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return right({ questionComment })
  }
}
