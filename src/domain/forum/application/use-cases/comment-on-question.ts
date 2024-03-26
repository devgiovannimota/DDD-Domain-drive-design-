/* eslint-disable prettier/prettier */
import { IQuestionRepository } from "../repositories/Iquestion-repository";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { IQuestionCommentsRepository } from "../repositories/Iquestion-comments-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestionionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionCommentsRepository: IQuestionCommentsRepository
  ) {}
  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new QuestionNotFoundError();
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });
    await this.questionCommentsRepository.create(questionComment);
    return { questionComment };
  }
}
