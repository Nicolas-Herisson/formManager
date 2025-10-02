import { DataTypes, Model } from "sequelize";
import sequelize from "../database/client";
import type { IQuestion, ICreateQuestion } from "../@types/question";
import Option from "./option";

export default class Question
  extends Model<IQuestion, ICreateQuestion>
  implements IQuestion
{
  public id!: number;
  public title!: string;
  public selector!: string;
  public required!: boolean;
  public form_id!: number;
  public options?: Option[];
  public image_url?: string;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selector: {
      type: DataTypes.TEXT,
    },
    required: {
      type: DataTypes.BOOLEAN,
    },
    form_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "questions",
  }
);
