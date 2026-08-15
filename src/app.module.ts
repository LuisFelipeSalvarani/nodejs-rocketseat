import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "@/auth/auth.module.js"
import { AuthenticationController } from "@/controllers/authenticate.controller.js"
import { CreateAccountController } from "@/controllers/create-account.controller.js"
import { CreateQuestionController } from "@/controllers/create-question.controller.js"
import { FetchRecentQuestionController } from "@/controllers/fetch-recent-questions.controller.js"
import { envSchema } from "@/env.js"
import { PrismaService } from "@/prisma/prisma.service.js"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticationController,
    CreateQuestionController,
    FetchRecentQuestionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
