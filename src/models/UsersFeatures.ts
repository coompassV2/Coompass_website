
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";
import Features from "./Features";

interface UsersFeaturesAttributes {
  id: string;
  featureId: string;
  userId: string;
  active: boolean;
}

export class UsersFeatures extends Model<UsersFeaturesAttributes> implements UsersFeaturesAttributes {
  declare id: string;
  declare featureId: string;
  declare userId: string;
  declare active: boolean;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
  declare readonly feature?: NonAttribute<Features>;
}

UsersFeatures.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    featureId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Features,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users_features",
    timestamps: true,
  }
);

export default UsersFeatures;
