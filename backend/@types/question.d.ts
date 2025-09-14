export interface IQuestion {
    id: number;
    title: string;
    selector: string;
    required: boolean;
    form_id: number;
}

export interface ICreateQuestion extends Optional<IQuestion, 'id' | 'createdAt' | 'updatedAt' | 'options'> {
    title: string;
    selector: string;
    required: boolean;
    form_id: number;
}