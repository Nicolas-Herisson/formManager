import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

export default class Question extends Model {};

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selector: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    required: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'questions'
});
