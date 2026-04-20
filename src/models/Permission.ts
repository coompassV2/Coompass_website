
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";

interface PermissionAttributes {
  userId: string;
  isAdmin: boolean;
  isModerator: boolean;
}

export class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
  declare userId: string;
  declare isAdmin: boolean;
  declare isModerator: boolean;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
}

Permission.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isModerator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "permissions",
    timestamps: false,
  }
);

export default Permission;
