/* eslint-disable prettier/prettier */
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-comment-questions";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { NotAllowed } from "../../errors/not-allowed";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let deleteQuestionCommentUseCase: DeleteQuestionCommentUseCase;

describe("Delete a question comment", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    deleteQuestionCommentUseCase = new DeleteQuestionCommentUseCase(
      inMemoryQuestionCommentsRepository
    );
  });

  it("Should be able to delete a comment question", async () => {
    const commentQuestion = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(commentQuestion);

    await deleteQuestionCommentUseCase.execute({
      authorId: commentQuestion.authorId.toString(),
      questionCommentId: commentQuestion.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.arrComments).toHaveLength(0);
  });

  it("Should not be able to delete a comment question from another user", async () => {
    const commentQuestion = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(commentQuestion);

    expect(() =>
      deleteQuestionCommentUseCase.execute({
        authorId: "lala",
        questionCommentId: commentQuestion.id.toString(),
      })
    ).rejects.toBeInstanceOf(NotAllowed);
  });
});
