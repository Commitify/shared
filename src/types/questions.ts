export enum QuestionType {
  String = "string",
  Number = "number",
  Select = "select",
}

export interface QuestionBase {
  id: string;
  title: string;
  tips?: string;
}

export interface QuestionSelectOption {
  id: string;
  title: string;
  value: string;
}

export interface QuestionSelect extends QuestionBase {
  type: QuestionType.Select;
  options: QuestionSelectOption[];
}

export interface QuestionOther extends QuestionBase {
  type: QuestionType.String | QuestionType.Number;
  placeholder?: string;
  validator?: (value: string | number) => boolean;
  formatter?: (value: string | number) => string;
}

export type Question = QuestionOther | QuestionSelect;
