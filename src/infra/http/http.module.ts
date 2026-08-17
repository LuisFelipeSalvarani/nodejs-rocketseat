import { Module } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service.js"
import { AuthenticationController } from "./controllers/authenticate.controller.js"
import { CreateAccountController } from "./controllers/create-account.controller.js"
import { CreateQuestionController } from "./controllers/create-question.controller.js"
import { FetchRecentQuestionController } from "./controllers/fetch-recent-questions.controller.js"

@Module({
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
