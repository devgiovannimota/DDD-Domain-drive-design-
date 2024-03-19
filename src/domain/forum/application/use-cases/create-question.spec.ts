/* eslint-disable prettier/prettier */
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";

let createQuestionUseCase: CreateQuestionUseCase;
let questionsRepository: InMemoryQuestionsRepository;

describe("Create a question", () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    createQuestionUseCase = new CreateQuestionUseCase(questionsRepository);
  });
  it("Should be able to create a question", async () => {
    const { question } = await createQuestionUseCase.execute({
      title: "DDD",
      authorId: "1",
      content: "DDD is a type of clean architecture?",
    });

    expect(question.content).toEqual(expect.any(String));
    expect(question.authorId.toValue()).toEqual("1");
  });
});
