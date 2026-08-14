import { Controller, Post, UseGuards } from "@nestjs/common"
import { CurrentUser } from "../auth/current-user-decorator.js"
import type { UserPayload } from "../auth/jwt.strategy.js"
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js"

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor() {}

  @Post()
  handle(@CurrentUser() user: UserPayload) {
    console.log(user)

    return "ok"
  }
}
