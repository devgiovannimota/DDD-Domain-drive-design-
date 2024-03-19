import { AnswerQuestionUseCase } from './answer-question'
import { IAnswerRepository } from '../repositories/Ianswers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: IAnswerRepository = {
  create: async (answer: Answer) => {
    console.log(answer)
  },
}

it('Create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)
  const answer = await answerQuestionUseCase.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1',
  })
  expect(answer.content).toEqual(expect.any(String))
  expect(answer.questionId.toValue()).toEqual('1')
})
