export interface Question {
    id: number;
    title: string;
    required: boolean;
    selector: string;
    options: string[];
}

export interface Form {
    title: string;
    description: string;
    questions: Question[];
}