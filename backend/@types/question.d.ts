export interface IQuestion {
    id: number;
    title: string;
    selector: string;
    required: boolean;
    form_id?: number;
    options?: IOption[]; 
    createdAt?: Date;
    updatedAt?: Date;

    createOption?: (option: ICreateOption) => Promise<IOption>;
    update?: (values: Partial<IQuestion>) => Promise<this>;
    destroy?: () => Promise<void>;
}

export interface ICreateQuestion {
    title: string;
    selector: string;
    required: boolean;
}