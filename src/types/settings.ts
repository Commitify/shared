import { Answer } from "./answer";
import { Question } from "./questions";

export type Setting = {
  name: string;
  questions: Question[];
  templating: (answers: Answer[]) => string;
  autoCommit?: boolean;
};
