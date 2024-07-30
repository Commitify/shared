import { Question, QuestionSelectOption } from "./questions";

export interface Answer {
  question: Question;
  value: QuestionSelectOption["id"] | string;
  formattedValue?: QuestionSelectOption["id"] | string;
}
