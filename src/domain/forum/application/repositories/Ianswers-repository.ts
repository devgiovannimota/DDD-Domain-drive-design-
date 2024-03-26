/* eslint-disable prettier/prettier */
import { Answer } from "../../enterprise/entities/answer";

export interface IAnswerRepository {
  findById(id: string): Promise<Answer | null>;
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
}
