/* eslint-disable prettier/prettier */

import { Question } from "../../enterprise/entities/question";

export interface IQuestionRepository {
  findById(id: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  findBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}
