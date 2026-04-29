
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";
import Mission from "./Mission";

interface MissionLogAttributes {
  id: string;
  action: string;
  userId: string;
  missionId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MissionLog extends Model<MissionLogAttributes> implements MissionLogAttributes {
  declare id: string;
  declare action: string;
  declare userId: string;
  declare missionId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
  declare readonly mission?: NonAttribute<Mission>;
  declare readonly hourLogs?: NonAttribute<any[]>; // HourLog[]
}

MissionLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    missionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Mission,
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
    tableName: "mission_logs",
    timestamps: true,
  }
);

export default MissionLog;
