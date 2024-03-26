/* eslint-disable prettier/prettier */
import { NotAllowed } from "../../errors/not-allowed";
import { EditAswerUseCase } from "./edit-answer";
import { MakeAnswer } from "test/factories/make-answers";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let editAnswerUseCase: EditAswerUseCase;

describe("Edit a answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    editAnswerUseCase = new EditAswerUseCase(inMemoryAnswersRepository);
  });
  it("Should be able to edit a answer", async () => {
    const newAnswer = MakeAnswer({});

    await inMemoryAnswersRepository.create(newAnswer);

    await editAnswerUseCase.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: "New content",
    });
    expect(inMemoryAnswersRepository.arrAnswers[0]).toMatchObject({
      content: "New content",
    });
  });
});

it("Should not be able to edit a answer from another user", async () => {
  const newAnswer = MakeAnswer({});

  await inMemoryAnswersRepository.create(newAnswer);

  await expect(() =>
    editAnswerUseCase.execute({
      answerId: newAnswer.id.toString(),
      authorId: "lalalala",
      content: "New content",
    })
  ).rejects.toBeInstanceOf(NotAllowed);
});
