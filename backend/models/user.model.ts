import sequelize from "../database/client";
import { DataTypes, Model } from "sequelize";
import type { IUser } from "../@types/user";

export default class User extends Model implements IUser {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

};

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'users'
});

