export interface IOption {
    id?: number;
    title: string;
    checked: boolean;
    question_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    update?: (values: Partial<IOption>) => Promise<this>;
    destroy?: () => Promise<void>;
}

export interface ICreateOption {
    title: string;
    checked: boolean;
}
