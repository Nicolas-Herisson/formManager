import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IInvite, IInviteCreate } from "../@types/invite";

export default class Invite
  extends Model<IInvite, IInviteCreate>
  implements IInvite
{
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiver_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "invites",
  }
);
