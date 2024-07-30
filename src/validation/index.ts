import Joi from "joi";
import { Answer, Question, QuestionBase, QuestionSelect, QuestionSelectOption, Setting } from "../types";

// Enum for QuestionType
const QuestionTypeSchema = {
  String: "string",
  Number: "number",
  Select: "select",
};

// Base Question Schema
const QuestionBaseSchema = Joi.object<Question>({
  id: Joi.string().required(),
  title: Joi.string().required(),
  tips: Joi.string().optional(),
});

// Select Option Schema
const QuestionSelectOptionSchema = Joi.object<QuestionSelectOption>({
  id: Joi.string().required(),
  title: Joi.string().required(),
  value: Joi.string().required(),
});

// Select Question Schema
const QuestionSelectSchema = QuestionBaseSchema.keys({
  type: Joi.string().valid(QuestionTypeSchema.Select).required(),
  options: Joi.array().items(QuestionSelectOptionSchema).required(),
});

// Other Question Schema
const QuestionOtherSchema = QuestionBaseSchema.keys({
  type: Joi.string().valid(QuestionTypeSchema.String, QuestionTypeSchema.Number).required(),
  placeholder: Joi.string().optional(),
  validator: Joi.function().arity(1).optional(),
  formatter: Joi.function().arity(1).optional(),
});

// General Question Schema
const QuestionSchema = Joi.alternatives().try(
  QuestionSelectSchema,
  QuestionOtherSchema
);

// Answer Schema
const AnswerSchema = Joi.object<Answer>({
  question: QuestionSchema.required(),
  value: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.string().valid(QuestionSelectOptionSchema.extract("id"))
    )
    .required(),
  formattedValue: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.string().valid(QuestionSelectOptionSchema.extract("id"))
    )
    .optional(),
});

// Setting Schema
const SettingSchema = Joi.object<Setting>({
  name: Joi.string().required(),
  questions: Joi.array().items(QuestionSchema).required(),
  templating: Joi.function().arity(1).required(),
});

export {
  QuestionTypeSchema,
  QuestionBaseSchema,
  QuestionSelectOptionSchema,
  QuestionSelectSchema,
  QuestionOtherSchema,
  QuestionSchema,
  AnswerSchema,
  SettingSchema,
};
