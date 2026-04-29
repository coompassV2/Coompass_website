
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";

interface SendgridLogAttributes {
  id: string;
  event: string;
}

export class SendgridLog extends Model<SendgridLogAttributes> implements SendgridLogAttributes {
  declare id: string;
  declare event: string;
}

SendgridLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sendgrid_logs",
    timestamps: true,
  }
);

export default SendgridLog;
