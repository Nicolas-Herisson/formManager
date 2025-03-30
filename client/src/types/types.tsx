export interface Question {
    id: number;
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
    questions: Question[];
}