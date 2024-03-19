/* eslint-disable prettier/prettier */

import { NotAllowed } from "../../errors/not-allowed";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { MakeAnswer } from "test/factories/make-answers";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let deleteAnswerUseCase: DeleteAnswerUseCase;

describe("Delete a answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    deleteAnswerUseCase = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });
  it("Should be able to delete a answer", async () => {
    const answer = MakeAnswer();

    await inMemoryAnswerRepository.create(answer);

    await deleteAnswerUseCase.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    });

    expect(inMemoryAnswerRepository.arrAnswers).toHaveLength(0);
  });

  it("Should not be able to delete a answer from another user", async () => {
    const answer = MakeAnswer({
      authorId: new UniqueEntityId("lala"),
    });

    await inMemoryAnswerRepository.create(answer);

    await expect(() =>
      deleteAnswerUseCase.execute({
        answerId: answer.id.toString(),
        authorId: "lolo",
      })
    ).rejects.toBeInstanceOf(NotAllowed);
  });
});
