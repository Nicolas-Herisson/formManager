import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client.js";

export default class Form extends Model {};

Form.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    tableName: 'template_forms'
});
