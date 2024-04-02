import { PaginationParams } from "@/core/repositories/paginations-params";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface IQuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(
    id: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>;
}
