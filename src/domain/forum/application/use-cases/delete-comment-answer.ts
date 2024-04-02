import { NotAllowed } from "../../errors/not-allowed";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { IAnswerCommentRepository } from "../repositories/Ianswer-comments-repository";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId
    );
    if (!answerComment) {
      throw new QuestionNotFoundError();
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new NotAllowed();
    }

    await this.answerCommentRepository.delete(answerComment);

    return {};
  }
}
