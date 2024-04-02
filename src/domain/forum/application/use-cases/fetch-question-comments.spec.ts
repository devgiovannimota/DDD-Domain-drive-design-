/* eslint-disable prettier/prettier */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

import { makeQuestionComment } from "test/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-comment-questions";
import { FetchQuestionCommentUseCase } from "@/domain/forum/application/use-cases/fetch-question-comments";

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository;
let fetchQuestionCommentUseCase: FetchQuestionCommentUseCase;

describe("Fetch question comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentsRepository();
    fetchQuestionCommentUseCase = new FetchQuestionCommentUseCase(
      inMemoryQuestionCommentRepository
    );
  });

  it("Should be able to fetch question comment", async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("01") })
    );

    const { questionsComment } = await fetchQuestionCommentUseCase.execute({
      questionId: "01",
      page: 1,
    });
    console.log(questionsComment);
    expect(questionsComment).toHaveLength(1);
  });

  it("Should be able to fetch question comment pagineted", async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId("01") })
      );
    }

    const { questionsComment } = await fetchQuestionCommentUseCase.execute({
      questionId: "01",
      page: 2,
    });
    expect(questionsComment).toHaveLength(3);
  });
});
