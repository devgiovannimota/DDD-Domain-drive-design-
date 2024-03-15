import { randomUUID } from "crypto";
import { Slug } from "./value-objects/slug";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
  slug: Slug;
}

export class Question {
  public id: string;
  public title: string;
  public slug: Slug;
  public content: string;
  public authorId: string;
  constructor(props: QuestionProps, id?: string) {
    this.title = props.title;
    this.slug = props.slug;
    this.content = props.content;
    this.id = id ?? randomUUID();
    this.authorId = props.authorId;
  }
}
