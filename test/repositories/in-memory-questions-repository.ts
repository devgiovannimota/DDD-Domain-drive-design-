import { IQuestionRepository } from "@/domain/forum/application/repositories/Iquestion-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements IQuestionRepository {
  public arrQuestions: Question[] = [];
  async create(question: Question) {
    this.arrQuestions.push(question);
  }
}
