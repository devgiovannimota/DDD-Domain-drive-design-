import { PaginationParams } from "@/core/repositories/paginations-params";
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

  async findById(id: string) {
    const question = this.arrQuestions.find(
      (question) => question.id.toString() === id
    );
    if (!question) {
      return null;
    }
    return question;
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.arrQuestions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async delete(question: Question) {
    const indexOf = this.arrQuestions.findIndex(
      (questions) => questions.id === question.id
    );
    this.arrQuestions.splice(indexOf, 1);
  }

  async create(question: Question) {
    this.arrQuestions.push(question);
  }

  async save(question: Question) {
    const indexOf = this.arrQuestions.findIndex(
      (questions) => questions.id === question.id
    );
    this.arrQuestions[indexOf] = question;
  }
}
