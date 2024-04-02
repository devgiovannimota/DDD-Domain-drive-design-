import { NotAllowed } from "../../errors/not-allowed";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { IQuestionCommentsRepository } from "../repositories/Iquestion-comments-repository";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: IQuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId
    );
    if (!questionComment) {
      throw new QuestionNotFoundError();
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new NotAllowed();
    }

    await this.questionCommentRepository.delete(questionComment);

    return {};
  }
}
