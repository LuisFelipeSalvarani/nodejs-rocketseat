import { Module } from "@nestjs/common"
import { QuestionsRepository } from "../../domain/forum/application/repositories/questions-repository.js"
import { StudentsRepository } from "../../domain/forum/application/repositories/students-repository.js"
import { PrismaService } from "./prisma/prisma.service.js"
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository.js"
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository.js"
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository.js"
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository.js"
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository.js"
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository.js"
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository.js"

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
})
export class DatabaseModule {}
