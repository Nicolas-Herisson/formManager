export interface IForm {
    id: number;
    title: string;
    description: string;
}

export interface ICreateForm extends Optional<IForm, 'id' | 'createdAt' | 'updatedAt'> {
    title: string;
    description: string;
}
