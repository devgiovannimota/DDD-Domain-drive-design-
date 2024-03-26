import { Answer } from "../../enterprise/entities/answer";
import { IAnswerRepository } from "../repositories/Ianswers-repository";

interface FetchQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: IAnswerRepository) {}
  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyQuestionsId(
      questionId,
      { page }
    );

    return { answers };
  }
}
