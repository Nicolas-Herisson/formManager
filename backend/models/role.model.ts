import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import type { IRole } from "../@types/role";

export default class Role extends Model implements IRole {
    public id!: number;
    public name!: string;

};

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'roles'
});

