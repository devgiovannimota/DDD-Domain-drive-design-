import { PaginationParams } from "@/core/repositories/paginations-params";
import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/Iquestion-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public arrComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.arrComments.push(questionComment);
  }
  async findById(id: string) {
    const question = this.arrComments.find(
      (question) => question.id.toString() === id
    );
    if (!question) {
      return null;
    }
    return question;
  }
  async findManyByQuestionId(id: string, { page }: PaginationParams) {
    const questionComments = this.arrComments
      .filter((questionComment) => questionComment.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20);
    return questionComments;
  }

  async delete(questionComment: QuestionComment) {
    const indexOf = this.arrComments.findIndex(
      (questionsComment) => questionsComment.id === questionComment.id
    );
    this.arrComments.splice(indexOf, 1);
  }
}
