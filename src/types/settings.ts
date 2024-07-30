import { Answer } from "./answer";
import { Question, QuestionOther, QuestionSelect } from "./questions";

export type Setting = {
  name: string;
  questions: (QuestionSelect | QuestionOther)[];
  templating: (answers: Answer[]) => string
};
