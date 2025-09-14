import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IQuestion } from "../@types/question";
import type { ICreateOption, IOption } from "../@types/option";

export default class Question extends Model implements IQuestion{
    public id!: number;
    public title!: string;
    public selector!: string;
    public required!: boolean;
    public form_id!: number;
    public options?: IOption[];

    declare createOption: (option: ICreateOption) => Promise<IOption>;
    declare destroy: () => Promise<void>;
};

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selector: {
        type: DataTypes.TEXT,
    },
    required: {
        type: DataTypes.BOOLEAN,
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'questions'
});
