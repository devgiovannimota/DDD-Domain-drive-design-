import { IQuestionCommentsRepository } from "@/domain/forum/application/repositories/Iquestion-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements IQuestionCommentsRepository
{
  public arrComments: QuestionComment[] = [];

  async create(questionComment: QuestionComment) {
    this.arrComments.push(questionComment);
  }
}
