import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IOption } from "../@types/option";

export default class Option extends Model implements IOption {
    id: number;
    title: string;
    checked: boolean;
    question_id: number;

    constructor(id?: number, title?: string, checked?: boolean, question_id?: number) {
        super();
        this.id = id || 0;
        this.title = title || "";
        this.checked = checked || false;
        this.question_id = question_id || 0;
    }
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