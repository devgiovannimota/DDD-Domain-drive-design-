import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerNotFoundError } from "../../errors/answer-not-found-error";
import { IAnswerCommentRepository } from "../repositories/Ianswer-comments-repository";
import { IAnswerRepository } from "../repositories/Ianswers-repository";

interface CommentOnAnswerRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: IAnswerRepository,
    private answerCommentsRepository: IAnswerCommentRepository
  ) {}
  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      throw new AnswerNotFoundError();
    }
    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityId(answerId),
      authorId: new UniqueEntityId(authorId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);
    return {
      answerComment,
    };
  }
}
