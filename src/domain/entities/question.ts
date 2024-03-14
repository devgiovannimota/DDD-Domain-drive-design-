import { randomUUID } from "crypto";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;
  constructor(props: QuestionProps, id?: string) {
    this.title = props.title;
    this.content = props.content;
    this.id = id ?? randomUUID();
    this.authorId = props.authorId;
  }
}
