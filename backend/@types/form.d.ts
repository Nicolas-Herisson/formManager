export interface IForm {
    id: number;
    title: string;
    description: string;
    questions?: IQuestion[];
    is_published: boolean;
}

export interface ICreateForm extends Optional<IForm, 'id' | 'createdAt' | 'updatedAt' | 'questions'> {
    title: string;
    description: string;
    is_published: boolean;
}
