/* eslint-disable prettier/prettier */
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { MakeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { NotAllowed } from "../../errors/not-allowed";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { MakeAnswer } from "test/factories/make-answers";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let chooseQuestionBestAnswerUseCase: ChooseQuestionBestAnswerUseCase;

describe("Choose a question best answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    chooseQuestionBestAnswerUseCase = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository
    );
  });
  it("Should be able to choose a question best answer", async () => {
    const question = MakeQuestion({});

    const answer = MakeAnswer({
      questionId: question.id,
    });

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionsRepository.create(question);

    await chooseQuestionBestAnswerUseCase.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    });
    console.log(inMemoryAnswersRepository.arrAnswers[0]);
    console.log(inMemoryQuestionsRepository.arrQuestions[0]);

    expect(inMemoryQuestionsRepository.arrQuestions).toHaveLength(1);
  });

  it("Should not be able to choose another user question best answer", async () => {
    const question = MakeQuestion({});

    const answer = MakeAnswer({
      questionId: question.id,
    });

    await inMemoryAnswersRepository.create(answer);
    await inMemoryQuestionsRepository.create(question);

    await expect(() =>
      chooseQuestionBestAnswerUseCase.execute({
        answerId: answer.id.toString(),
        authorId: "lala",
      })
    ).rejects.toBeInstanceOf(NotAllowed);
  });
});
