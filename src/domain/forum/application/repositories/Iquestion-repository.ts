/* eslint-disable prettier/prettier */
import { PaginationParams } from "@/core/repositories/paginations-params";
import { Question } from "../../enterprise/entities/question";

export interface IQuestionRepository {
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
  findManyRecent(params: PaginationParams): Promise<Question[]>;
}
