import { makeAnswer } from "../../../../../test/factories/make-answer.js"
import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository.js"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js"
import { InMemoryAttachmentsRepository } from "../../../../../test/repositories/in-memory-attachments-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachment-repository.js"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js"
import { InMemoryStudentsRepository } from "../../../../../test/repositories/in-memory-students-repository.js"
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"
import { NotAllowedError } from "../../../../core/errors/errors/not-allowed-error.js"
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let sut: ChooseQuestionBestAnswerUseCase

describe("Choose Question Best Answer", () => {
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
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    )
  })

  it("should be able to choose the question best answer", async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID("author-1"),
    })
    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: "author-2",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
