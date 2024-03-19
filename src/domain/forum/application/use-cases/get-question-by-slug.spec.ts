/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { Question } from "../../enterprise/entities/question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let getQuestionBySlugCase: GetQuestionBySlugUseCase;

describe("Find a question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    getQuestionBySlugCase = new GetQuestionBySlugUseCase(
      inMemoryQuestionsRepository
    );
  });
  it("Should be able to get a question by slug", async () => {
    const newQuestion = Question.create({
      title: "Example question A B C D E",
      authorId: new UniqueEntityId(),
      slug: Slug.create("example-question-a-b-c-d-e"),
      content: "DDD is a type of clean architecture?",
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await getQuestionBySlugCase.execute({
      slug: "example-question-a-b-c-d-e",
    });

    expect(question.slug.value).toEqual("example-question-a-b-c-d-e");
  });
});
