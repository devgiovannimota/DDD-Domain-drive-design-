import { IQuestionRepository } from "@/domain/forum/application/repositories/Iquestion-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements IQuestionRepository {
  public arrQuestions: Question[] = [];

  async findBySlug(slug: string) {
    const question = this.arrQuestions.find(
      (question) => question.slug.value === slug
    );
    if (!question) {
      return null;
    }
    return question;
  }

  async create(question: Question) {
    this.arrQuestions.push(question);
  }
}
