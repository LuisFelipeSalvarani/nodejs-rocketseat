import { MockInstance } from "vitest"
import { makeAnswer } from "../../../../../test/factories/make-answer.js"
import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository.js"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js"
import { InMemoryAttachmentsRepository } from "../../../../../test/repositories/in-memory-attachments-repository.js"
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachment-repository.js"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js"
import { InMemoryStudentsRepository } from "../../../../../test/repositories/in-memory-students-repository.js"
import { waitFor } from "../../../../../test/utils/wait-for.js"
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from "../use-cases/send-notification.js"
import { OnAnswerCreated } from "./on-answer-created.js"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest
  ) => Promise<SendNotificationUseCaseResponse>
>

describe("On Answer Created", () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, "execute")

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it("should send a notification when an answer is created", async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => expect(sendNotificationExecuteSpy).toHaveBeenCalled())
  })
})
