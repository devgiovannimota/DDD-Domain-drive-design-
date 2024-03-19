import { IAnswerRepository } from "@/domain/forum/application/repositories/Ianswers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements IAnswerRepository {
  public arrAnswers: Answer[] = [];
  async create(answer: Answer) {
    this.arrAnswers.push(answer);
  }
}
