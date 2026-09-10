import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { InMemoryAttachmentsRepository } from "../../../../../test/repositories/in-memory-attachments-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachment-repository.js"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js"
import { InMemoryStudentsRepository } from "../../../../../test/repositories/in-memory-students-repository.js"
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: FetchRecentQuestionsUseCase

describe("Fetch Recent Questions", () => {
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
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) })
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) })
    )
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 23) })
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      inMemoryQuestionsRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
