/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { NotAllowed } from "../../errors/not-allowed";
import { MakeAnswer } from "test/factories/make-answers";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-comment-questions";
import { CommentOnQuestionionUseCase } from "./comment-on-question";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let commentOnQuestionionUseCase: CommentOnQuestionionUseCase;

describe("Comment on question use case", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    commentOnQuestionionUseCase = new CommentOnQuestionionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository
    );
  });

  it("Should be able to create a comment question", async () => {
    const question = MakeQuestion({});

    await inMemoryQuestionsRepository.create(question);

    await commentOnQuestionionUseCase.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste",
    });

    expect(inMemoryQuestionCommentsRepository.arrComments[0].content).toEqual(
      "Comentário teste"
    );
  });
});
