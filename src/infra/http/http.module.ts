import { Module } from "@nestjs/common"
import { DatabaseModule } from "../database/database.module.js"
import { AuthenticationController } from "./controllers/authenticate.controller.js"
import { CreateAccountController } from "./controllers/create-account.controller.js"
import { CreateQuestionController } from "./controllers/create-question.controller.js"
import { FetchRecentQuestionController } from "./controllers/fetch-recent-questions.controller.js"

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
})
export class HttpModule {}
