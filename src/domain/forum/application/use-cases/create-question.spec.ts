import { QuestionRepository } from '../repositories/questions-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const questionQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await questionQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
