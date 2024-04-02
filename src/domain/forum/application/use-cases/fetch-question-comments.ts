import { QuestionComment } from "../../enterprise/entities/question-comment";
import { IQuestionCommentsRepository } from "../repositories/Iquestion-comments-repository";

interface FetchQuestionCommentUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentUseCaseResponse {
  questionsComment: QuestionComment[];
}

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}
  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionsComment =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      });

    return { questionsComment };
  }
}
