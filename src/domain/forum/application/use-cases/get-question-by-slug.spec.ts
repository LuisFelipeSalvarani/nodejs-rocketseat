import { makeAttachment } from "../../../../../test/factories/make-attachment.js"
import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { makeQuestionAttachment } from "../../../../../test/factories/make-question-attachment.js"
import { makeStudent } from "../../../../../test/factories/make-student.js"
import { InMemoryAttachmentsRepository } from "../../../../../test/repositories/in-memory-attachments-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachment-repository.js"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js"
import { InMemoryStudentsRepository } from "../../../../../test/repositories/in-memory-students-repository.js"
import { Slug } from "../../enterprise/entities/value-objects/slug.js"
import { GetQuestionBySlugUseCase } from "./get-question-by-slug.js"

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe("Get Question By Slug", () => {
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
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it("should be able to get a question by slug", async () => {
    const student = makeStudent({ name: "John Doe" })

    inMemoryStudentsRepository.items.push(student)

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create("example-question"),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = makeAttachment({ title: "Some attachment" })

    await inMemoryAttachmentsRepository.create(attachment)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      })
    )

    const result = await sut.execute({
      slug: "example-question",
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: "John Doe",
        attachments: [
          expect.objectContaining({
            title: "Some attachment",
          }),
        ],
      }),
    })
  })
})
