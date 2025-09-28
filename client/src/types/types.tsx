export interface Question {
  id: number;
  title: string;
  required: boolean;
  selector: string;
  options: Option[];
}

export interface QuestionToSend {
  title: string;
  required: boolean;
  selector: string;
  options: Option[];
}

export interface Option {
  id: number;
  title: string;
  checked: boolean;
}

export interface Form {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  questions: Question[];
}

export type AnswerValue = string | number | number[];

export type AnswerMap = Record<string, AnswerValue>;

export interface Response {
  id?: number;
  form_id: number;
  response: string | AnswerMap;
  token?: string;
}

export interface createResponse {
  form_id: number;
}

export interface updateResponse {
  form_id: number;
  response: AnswerMap;
  token: string;
}

export interface ParsedResponse {
  id: number;
  form_id: number;
  response: string;
  parsed: Record<string, string | number | number[]>;
}

export interface Error {
  response: {
    data: {
      message: string;
      code: number;
    };
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role_id: number;
}

export interface Role {
  id: number;
  name: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
