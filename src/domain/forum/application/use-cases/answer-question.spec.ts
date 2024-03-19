/* eslint-disable prettier/prettier */
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let answerRepository: InMemoryAnswersRepository;
let answerQuestionUseCase: AnswerQuestionUseCase;

describe("Create an answer", () => {
  beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository();
    answerQuestionUseCase = new AnswerQuestionUseCase(answerRepository);
  });

  it("Should be able to creante an answer", async () => {
    const { answer } = await answerQuestionUseCase.execute({
      instructorId: "1",
      questionId: "1",
      content: "Nova resposta",
    });

    expect(answer.content).toEqual(expect.any(String));
    expect(answer.questionId.toValue()).toEqual("1");
  });
});
