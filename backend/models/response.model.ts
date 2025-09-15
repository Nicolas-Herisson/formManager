import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import type { IResponse } from "../@types/response";

export default class Response extends Model implements IResponse {
    public id!: number;
    public form_id!: number;
    public response!: string;

};

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
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'responses'
});

