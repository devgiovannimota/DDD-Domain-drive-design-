import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memoery-comments-answer-repository";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { MakeAnswer } from "test/factories/make-answers";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let commentOnAnswerUseCase: CommentOnAnswerUseCase;

describe("Comment On Answer Use Case", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    commentOnAnswerUseCase = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("Should be able to comment on answer", async () => {
    const answer = MakeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await commentOnAnswerUseCase.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: "new comment",
    });

    expect(inMemoryAnswerCommentsRepository.arrComments[0].content).toEqual(
      "new comment"
    );
  });
});
