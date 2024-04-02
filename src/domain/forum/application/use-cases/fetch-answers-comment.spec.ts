/* eslint-disable prettier/prettier */
import { MakeAnswer } from "test/factories/make-answers";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-comments-answer-repository";
import { FetchAnswerCommentUseCase } from "./fetch-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswersCommentRepository: InMemoryAnswerCommentsRepository;
let fetchAnswerCommentUseCase: FetchAnswerCommentUseCase;

describe("Fetch answer comments", () => {
  beforeEach(() => {
    inMemoryAnswersCommentRepository = new InMemoryAnswerCommentsRepository();
    fetchAnswerCommentUseCase = new FetchAnswerCommentUseCase(
      inMemoryAnswersCommentRepository
    );
  });

  it("Should be able to fetch answers comment", async () => {
    await inMemoryAnswersCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("Answer 01") })
    );

    const { answersComment } = await fetchAnswerCommentUseCase.execute({
      answerId: "Answer 01",
      page: 1,
    });

    expect(answersComment).toHaveLength(1);
  });

  it("Should be able to fetch answers comment by pagination", async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryAnswersCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId("Answer 01") })
      );
    }

    const { answersComment } = await fetchAnswerCommentUseCase.execute({
      answerId: "Answer 01",
      page: 2,
    });
    expect(answersComment).toHaveLength(3);
  });
});
