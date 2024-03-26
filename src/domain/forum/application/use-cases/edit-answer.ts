import { AnswerNotFoundError } from "../../errors/answer-not-found-error";
import { NotAllowed } from "../../errors/not-allowed";
import { IAnswerRepository } from "../repositories/Ianswers-repository";

interface EditAnswerUseCaseRequest {
  content: string;
  authorId: string;
  answerId: string;
}

interface EditAnswerUseCaseResponse {}

export class EditAswerUseCase {
  constructor(private answerRepository: IAnswerRepository) {}

  async execute({
    authorId,
    content,
    answerId,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      throw new AnswerNotFoundError();
    }

    if (authorId !== answer.authorId.toString()) {
      throw new NotAllowed();
    }

    answer.content = content;

    await this.answerRepository.save(answer);

    return {};
  }
}
