import { NotAllowed } from "../../errors/not-allowed";
import { QuestionNotFoundError } from "../../errors/question-not-found";
import { IQuestionRepository } from "../repositories/Iquestion-repository";

interface EditQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  questionId: string;
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      throw new QuestionNotFoundError();
    }

    if (authorId !== question.authorId.toString()) {
      throw new NotAllowed();
    }

    question.title = title;
    question.content = content;

    await this.questionRepository.save(question);

    return {};
  }
}
