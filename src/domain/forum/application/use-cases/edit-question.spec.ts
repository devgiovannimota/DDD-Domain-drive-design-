/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

import { NotAllowed } from "../../errors/not-allowed";
import { EditQuestionUseCase } from "./edit-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let editQuestionUseCase: EditQuestionUseCase;

describe("Edit a question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    editQuestionUseCase = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });
  it("Should be able to edit a question", async () => {
    const newQuestion = MakeQuestion({});

    await inMemoryQuestionsRepository.create(newQuestion);

    await editQuestionUseCase.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      content: "New content",
      title: "New Title",
    });
    expect(inMemoryQuestionsRepository.arrQuestions[0]).toMatchObject({
      title: "New Title",
      content: "New content",
    });
  });
});

it("Should not be able to edit a question from another user", async () => {
  const newQuestion = MakeQuestion({});

  await inMemoryQuestionsRepository.create(newQuestion);

  await expect(() =>
    editQuestionUseCase.execute({
      questionId: newQuestion.id.toString(),
      authorId: "lalalala",
      content: "New content",
      title: "New Title",
    })
  ).rejects.toBeInstanceOf(NotAllowed);
});
