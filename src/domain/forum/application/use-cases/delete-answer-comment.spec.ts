/* eslint-disable prettier/prettier */
import { makeQuestionComment } from "test/factories/make-question-comment";
import { NotAllowed } from "../../errors/not-allowed";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memoery-comments-answer-repository";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let deleteAnswerCommentUseCase: DeleteAnswerCommentUseCase;

describe("Delete a answer comment", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    deleteAnswerCommentUseCase = new DeleteAnswerCommentUseCase(
      inMemoryAnswerCommentsRepository
    );
  });

  it("Should be able to delete a answer question", async () => {
    const answerComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(answerComment);

    await deleteAnswerCommentUseCase.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.arrComments).toHaveLength(0);
  });

  it("Should not be able to delete a comment question from another user", async () => {
    const answerComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(answerComment);

    expect(() =>
      deleteAnswerCommentUseCase.execute({
        authorId: "lala",
        answerCommentId: answerComment.id.toString(),
      })
    ).rejects.toBeInstanceOf(NotAllowed);
  });
});
