/* eslint-disable prettier/prettier */
import { NotAllowed } from "../../errors/not-allowed";
import { IAnswerRepository } from "../repositories/Ianswers-repository";

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);
    if (!answer) {
      throw new Error("Answer not found!");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new NotAllowed();
    }
    await this.answerRepository.delete(answer);
    return {};
  }
}
