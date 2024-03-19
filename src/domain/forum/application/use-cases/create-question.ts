/* eslint-disable prettier/prettier */

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { IQuestionRepository } from "../repositories/Iquestion-repository";

interface CreateQuestUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestUseCaseResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}
  async execute({
    authorId,
    title,
    content,
  }: CreateQuestUseCaseRequest): Promise<CreateQuestUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });
    await this.questionRepository.create(question);
    return { question };
  }
}
