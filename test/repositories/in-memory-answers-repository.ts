import { PaginationParams } from "@/core/repositories/paginations-params";
import { IAnswerRepository } from "@/domain/forum/application/repositories/Ianswers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements IAnswerRepository {
  public arrAnswers: Answer[] = [];
  async create(answer: Answer) {
    this.arrAnswers.push(answer);
  }

  async findManyQuestionsId(questionId: string, { page }: PaginationParams) {
    const answers = this.arrAnswers
      .filter((answers) => answers.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);
    return answers;
  }

  async findById(id: string) {
    const answer = this.arrAnswers.find(
      (answer) => answer.id.toString() === id
    );
    if (!answer) {
      return null;
    }
    return answer;
  }

  async delete(answer: Answer) {
    const indexOf = this.arrAnswers.findIndex(
      (answers) => answers.id === answer.id
    );
    this.arrAnswers.splice(indexOf, 1);
  }

  async save(answer: Answer) {
    const indexOf = this.arrAnswers.findIndex(
      (answers) => answers.id === answer.id
    );
    this.arrAnswers[indexOf] = answer;
  }
}
