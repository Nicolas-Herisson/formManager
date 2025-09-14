import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import type { IResponse } from "../@types/response";

export default class Response extends Model implements IResponse {
    id: number;
    form_id: number;
    response: string;

    constructor(id?: number, form_id?: number, response?: string) {
        super();
        this.id = id || 0;
        this.form_id = form_id || 0;
        this.response = response || "";
    }
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
        type: DataTypes.TEXT
    }
}, {
    sequelize,
    tableName: 'responses'
});

