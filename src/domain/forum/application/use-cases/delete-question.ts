import { Injectable } from "@nestjs/common"
import { Either, left, right } from "../../../../core/either.js"
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error.js"
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error.js"
import { QuestionsRepository } from "../repositories/questions-repository.js"

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteQuestionUseCase {
  constructor(private readonly questionRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right(null)
  }
}
