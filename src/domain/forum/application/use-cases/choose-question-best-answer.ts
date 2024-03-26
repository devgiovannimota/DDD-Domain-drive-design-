/* eslint-disable prettier/prettier */
import { IAnswerRepository } from "../repositories/Ianswers-repository";
import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/Iquestion-repository";
import { AnswerNotFoundError } from "../../errors/answer-not-found-error";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { NotAllowed } from "../../errors/not-allowed";

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: IAnswerRepository,
    private questionsRepository: IQuestionRepository
  ) {}
  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new AnswerNotFoundError();
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new QuestionNotFoundError();
    }

    if (authorId !== question.authorId.toString()) {
      throw new NotAllowed();
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
