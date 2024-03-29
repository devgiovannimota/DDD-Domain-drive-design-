/* eslint-disable prettier/prettier */
import { NotAllowed } from "../../errors/not-allowed";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { IQuestionRepository } from "../repositories/Iquestion-repository";

interface DeleteQuestUseCaseRequest {
  questionId: string;
  authorId: string;
}

interface DeleteQuestUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}
  async execute({
    questionId,
    authorId,
  }: DeleteQuestUseCaseRequest): Promise<DeleteQuestUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);
    if (!question) {
      throw new QuestionNotFoundError();
    }
    if (authorId !== question.authorId.toString()) {
      throw new NotAllowed();
    }
    await this.questionRepository.delete(question);
    return {};
  }
}
