import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { z } from "zod"
import { FetchRecentQuestionsUseCase } from "../../../domain/forum/application/use-cases/fetch-recent-questions.js"
import { JwtAuthGuard } from "../../auth/jwt-auth.guard.js"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe.js"

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(readonly fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const questions = await this.fetchRecentQuestions.execute({
      page,
    })

    return { questions }
  }
}
