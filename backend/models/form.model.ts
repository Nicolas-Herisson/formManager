import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IForm, ICreateForm } from "../@types/form";
import Question from "./questions.model";

export default class Form extends Model<IForm, ICreateForm> implements IForm {
    public id!: number;
    public title!: string;
    public description!: string;
    public questions!: Question[];

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
