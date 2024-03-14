import { expect, it } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";

it("Create an answer", () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();
  const answer = answerQuestionUseCase.execute({
    content: "Nova resposta",
    instructorId: "1",
    questionId: "1",
  });

  expect(answer.content).toEqual(expect.any(String));
});
