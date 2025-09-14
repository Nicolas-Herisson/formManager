export interface IForm {
    id: number;
    title: string;
    description: string;
    questions: IQuestion[];
    createdAt?: Date;
    updatedAt?: Date;
    update?: (values: Partial<IForm>) => Promise<this>;
    destroy?: () => Promise<void>;
}