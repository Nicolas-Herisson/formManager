import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

export default class Option extends Model {};

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
    }
}, {
    sequelize,
    tableName: 'options'
});