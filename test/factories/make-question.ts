import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function MakeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: "Example question A B C D E",
    authorId: new UniqueEntityId(),
    slug: Slug.create("example-question-a-b-c-d-e"),
    content: "DDD is a type of clean architecture?",
    ...override,
  });

  return question;
}
