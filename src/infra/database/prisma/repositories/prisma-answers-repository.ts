import { Injectable } from "@nestjs/common"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { AnswersRepository } from "../../../../domain/forum/application/repositories/answers-repository.js"
import { Answer } from "../../../../domain/forum/enterprise/entities/answer.js"

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  findById(_id: string): Promise<Answer | null> {
    throw new Error("Method not implemented.")
  }

  findManyByQuestionId(
    _questionId: string,
    _params: PaginationParams
  ): Promise<Answer[]> {
    throw new Error("Method not implemented.")
  }

  create(_answer: Answer): Promise<void> {
    throw new Error("Method not implemented.")
  }

  save(_answer: Answer): Promise<void> {
    throw new Error("Method not implemented.")
  }

  delete(_answer: Answer): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
