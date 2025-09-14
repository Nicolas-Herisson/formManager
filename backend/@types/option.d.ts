import { Optional } from "sequelize";

export interface IOption {
    id: number;
    title: string;
    checked: boolean;
    question_id: number;
}

export interface ICreateOption extends Optional<IOption, 'id' | 'createdAt' | 'updatedAt'> {
    title: string;
    checked: boolean;
}
