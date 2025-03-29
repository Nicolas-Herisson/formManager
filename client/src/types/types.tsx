export interface Question {
    id: number;
    title: string;
    required: boolean;
    selector: string;
    options: string[];
}