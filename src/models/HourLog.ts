
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import MissionLog from "./MissionLog";

interface HourLogAttributes {
  id: string;
  amount: number;
  participantId: string;
  missionLogId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class HourLog extends Model<HourLogAttributes> implements HourLogAttributes {
  declare id: string;
  declare amount: number;
  declare participantId: string;
  declare missionLogId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Virtual fields for associations
  declare readonly missionLog?: NonAttribute<MissionLog>;
}

HourLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    missionLogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: MissionLog,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "hour_logs",
    timestamps: true,
  }
);

export default HourLog;
