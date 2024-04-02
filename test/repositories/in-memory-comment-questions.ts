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

  async delete(questionComment: QuestionComment) {
    const indexOf = this.arrComments.findIndex(
      (questionsComment) => questionsComment.id === questionComment.id
    );
    this.arrComments.splice(indexOf, 1);
  }
}
