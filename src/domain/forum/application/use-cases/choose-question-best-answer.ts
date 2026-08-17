import { Either, left, right } from "../../../../core/either.js"
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error.js"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.js"
import { Question } from "../../enterprise/entities/question.js"
import { AnswerRepository } from "../repositories/answers-repository.js"
import { QuestionRepository } from "../repositories/questions-repository.js"

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly answerRepository: AnswerRepository
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toValue()
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.answerRepository.save(answer)

    return right({ question })
  }
}
