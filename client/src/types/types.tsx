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
}

export interface ParsedResponse {
    id: number;
    form_id: number;
    response: string;
    parsed: Record<string, string | number | number[]>;
}
