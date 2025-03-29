import sequelize from "../database/client.js";
import { DataTypes, Model } from "sequelize";

export default class Response extends Model {};

Response.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    form_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    response: {
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    tableName: 'responses'
});

