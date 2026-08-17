import { Injectable } from "@nestjs/common"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { QuestionCommentsRepository } from "../../../../domain/forum/application/repositories/question-comments-repository.js"
import { QuestionComment } from "../../../../domain/forum/enterprise/entities/question-comment.js"

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  findById(_id: string): Promise<QuestionComment | null> {
    throw new Error("Method not implemented.")
  }

  findManyByQuestionId(
    _questionId: string,
    _params: PaginationParams
  ): Promise<QuestionComment[]> {
    throw new Error("Method not implemented.")
  }

  create(_questionComment: QuestionComment): Promise<void> {
    throw new Error("Method not implemented.")
  }

  delete(_questionComment: QuestionComment): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
