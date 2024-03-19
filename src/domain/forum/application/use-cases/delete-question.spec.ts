/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowed } from "../../errors/not-allowed";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let deleteQuestionUseCase: DeleteQuestionUseCase;

describe("Delete a question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    deleteQuestionUseCase = new DeleteQuestionUseCase(
      inMemoryQuestionsRepository
    );
  });
  it("Should be able to delete a question", async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create("example-question-a-b-c-d-e"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    await deleteQuestionUseCase.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.arrQuestions).toHaveLength(0);
  });

  it("Should not be able to delete a question from another user", async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create("example-question-a-b-c-d-e"),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(() =>
      deleteQuestionUseCase.execute({
        questionId: newQuestion.id.toString(),
        authorId: "lala",
      })
    ).rejects.toBeInstanceOf(NotAllowed);
  });
});
