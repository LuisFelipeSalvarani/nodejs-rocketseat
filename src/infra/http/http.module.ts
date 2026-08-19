import { Module } from "@nestjs/common"
import { AuthenticateStudentUseCase } from "../../domain/forum/application/use-cases/authenticate-student.js"
import { CreateQuestionUseCase } from "../../domain/forum/application/use-cases/create-question.js"
import { FetchRecentQuestionsUseCase } from "../../domain/forum/application/use-cases/fetch-recent-questions.js"
import { RegisterStudentUseCase } from "../../domain/forum/application/use-cases/register-student.js"
import { CryptographyModule } from "../cryptography/cryptography.module.js"
import { DatabaseModule } from "../database/database.module.js"
import { AuthenticationController } from "./controllers/authenticate.controller.js"
import { CreateAccountController } from "./controllers/create-account.controller.js"
import { CreateQuestionController } from "./controllers/create-question.controller.js"
import { FetchRecentQuestionController } from "./controllers/fetch-recent-questions.controller.js"

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}
