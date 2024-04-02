import { IAnswerCommentRepository } from "@/domain/forum/application/repositories/Ianswer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentRepository
{
  public arrComments: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.arrComments.push(answerComment);
  }
}
