import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

export default class Question extends Model {};

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
    }
}, {
    sequelize,
    tableName: 'questions'
});
