import { PaginationParams } from "@/core/repositories/paginations-params";
import { IAnswerCommentRepository } from "@/domain/forum/application/repositories/Ianswer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements IAnswerCommentRepository
{
  public arrComments: AnswerComment[] = [];

  async create(answerComment: AnswerComment) {
    this.arrComments.push(answerComment);
  }
  async delete(answerComment: AnswerComment) {
    const indexOf = this.arrComments.findIndex(
      (answersComments) => answersComments.id === answerComment.id
    );
    this.arrComments.splice(indexOf, 1);
  }
  async findById(id: string) {
    const answer = this.arrComments.find(
      (answersComment) => answersComment.id.toString() === id
    );

    if (!answer) {
      return null;
    }
    return answer;
  }
  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const answersComment = this.arrComments
      .filter((answerComment) => answerComment.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20);

    return answersComment;
  }
}
