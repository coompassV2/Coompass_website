
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";
import Mission from "./Mission";

interface UserLogAttributes {
  id: string;
  amount: number;
  userId: string;
  missionId: string;
  action: string;
}

export class UserLog extends Model<UserLogAttributes> implements UserLogAttributes {
  declare id: string;
  declare amount: number;
  declare userId: string;
  declare missionId: string;
  declare action: string;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
  declare readonly mission?: NonAttribute<Mission>;
}

UserLog.init(
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
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "user_logs",
    timestamps: true,
  }
);

export default UserLog;
