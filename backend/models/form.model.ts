import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IForm } from "../@types/form";
import type { ICreateQuestion, IQuestion } from "../@types/question";
import type { ICreateOption, IOption } from "../@types/option";

export default class Form extends Model implements IForm {
    public id!: number;
    public title!: string;
    public description!: string;
    public questions!: IQuestion[];

    declare createQuestion: (question: ICreateQuestion) => Promise<IQuestion>;
    declare updateQuestion: (question: IQuestion) => Promise<IQuestion>;
    declare createOption: (option: ICreateOption) => Promise<IOption>;
    declare destroy: () => Promise<void>;
};

Form.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    tableName: 'forms'
});
