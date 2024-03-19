/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { MakeQuestion } from "test/factories/make-question";
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
    const newQuestion = MakeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await getQuestionBySlugCase.execute({
      slug: "example-question-a-b-c-d-e",
    });

    expect(question.slug.value).toEqual("example-question-a-b-c-d-e");
  });
});
