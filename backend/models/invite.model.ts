import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IInvite } from "../@types/invite";

export default class Invite extends Model<IInvite> implements IInvite {
  public id!: number;
  public sender_id!: string;
  public receiver_id!: string;
}

Invite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "invites",
  }
);
