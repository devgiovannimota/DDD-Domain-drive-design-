/* eslint-disable prettier/prettier */
import { PaginationParams } from "@/core/repositories/paginations-params";
import { Answer } from "../../enterprise/entities/answer";

export interface IAnswerRepository {
  findById(id: string): Promise<Answer | null>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  findManyQuestionsId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>;
}
