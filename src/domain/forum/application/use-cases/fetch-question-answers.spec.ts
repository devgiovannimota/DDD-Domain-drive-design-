/* eslint-disable prettier/prettier */
import { MakeQuestion } from "test/factories/make-question";
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answers";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase;

describe("Fetch questions", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    fetchQuestionAnswersUseCase = new FetchQuestionAnswersUseCase(
      inMemoryAnswersRepository
    );
  });
  it("Should be able to fetch question answers", async () => {
    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId("question-01") })
    );
    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId("question-01") })
    );
    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId("question-01") })
    );

    const { answers } = await fetchQuestionAnswersUseCase.execute({
      questionId: "question-01",
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it("Should be able to fetch paginated questions answers", async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswersRepository.create(
        MakeAnswer({ questionId: new UniqueEntityId("question-01") })
      );
    }
    const { answers } = await fetchQuestionAnswersUseCase.execute({
      page: 2,
      questionId: "question-01",
    });
    expect(answers).toHaveLength(3);
  });
});
