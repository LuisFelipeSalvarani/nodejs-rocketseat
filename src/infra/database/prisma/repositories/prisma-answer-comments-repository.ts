import { Injectable } from "@nestjs/common"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { AnswerCommentsRepository } from "../../../../domain/forum/application/repositories/answer-comments-repository.js"
import { AnswerComment } from "../../../../domain/forum/enterprise/entities/answer-comment.js"

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(_id: string): Promise<AnswerComment | null> {
    throw new Error("Method not implemented.")
  }

  findManyByAnswerId(
    _answerId: string,
    _params: PaginationParams
  ): Promise<AnswerComment[]> {
    throw new Error("Method not implemented.")
  }

  create(_answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.")
  }

  delete(_answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
