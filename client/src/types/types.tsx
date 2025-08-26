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

export interface OptionToSend {
    title: string;
    checked: boolean;
}

export interface Form {
    id: number;
    title: string;
    description: string;
    questions: Question[];
}

export interface FormToSend {
    title: string;
    description: string;
    questions: Question[];
}

export type AnswerValue = string | number | number[];
export interface Answer {
    questionId: number;
    value: AnswerValue;
}

export type AnswerMap = Record<number, AnswerValue>;

export interface Response {
    id?: number;
    form_id: number;
    response: string;
}

export interface ParsedResponse {
    id: number;
    form_id: number;
    response: string;
    parsed: Record<number, string | number | number[]>;
}
