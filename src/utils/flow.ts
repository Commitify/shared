import { Answer, Question, QuestionType } from "../types";

interface Deps {
  askString: (question: Question) => Promise<Answer>;
  askNumber: (question: Question) => Promise<Answer>;
  askChoice: (question: Question) => Promise<Answer>;
}

export const flow =
  (deps: Deps) =>
  async (questions: Question[]): Promise<Answer[]> => {
    const answers: Answer[] = [];

    for (const question of questions) {
      if (question.type === QuestionType.String) {
        answers.push(await deps.askString(question));
      } else if (question.type === QuestionType.Number) {
        answers.push(await deps.askNumber(question));
      } else if (question.type === QuestionType.Select) {
        answers.push(await deps.askChoice(question));
      } else {
        throw new Error("Unknown Question type");
      }
    }

    return answers;
  };
