import { Injectable } from "@nestjs/common"
import { PaginationParams } from "../../../../core/repositories/pagination-params.js"
import { QuestionsRepository } from "../../../../domain/forum/application/repositories/questions-repository.js"
import { Question } from "../../../../domain/forum/enterprise/entities/question.js"

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  findById(_id: string): Promise<Question | null> {
    throw new Error("Method not implemented.")
  }

  findBySlug(_slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.")
  }

  findManyRecent(_params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.")
  }

  create(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }

  save(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }

  delete(_question: Question): Promise<void> {
    throw new Error("Method not implemented.")
  }
}
