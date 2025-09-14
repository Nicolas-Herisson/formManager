import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IOption, ICreateOption } from "../@types/option";

export default class Option extends Model<IOption, ICreateOption> implements IOption {
    public id!: number;
    public title!: string;
    public checked!: boolean;
    public question_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

Option.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checked: {
        type: DataTypes.BOOLEAN,
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'options'
});