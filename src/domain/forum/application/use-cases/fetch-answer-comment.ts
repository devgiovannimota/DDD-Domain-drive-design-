import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { IAnswerCommentRepository } from "../repositories/Ianswer-comments-repository";

interface FetchAnswerCommentUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentUseCaseResponse {
  answersComment: AnswerComment[];
}

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}
  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answersComment =
      await this.answerCommentRepository.findManyByAnswerId(answerId, { page });

    return { answersComment };
  }
}
