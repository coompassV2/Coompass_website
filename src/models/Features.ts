
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";

interface FeaturesAttributes {
  id: string;
  name: string;
}

export class Features extends Model<FeaturesAttributes> implements FeaturesAttributes {
  declare id: string;
  declare name: string;

  // Virtual fields for associations
  declare readonly userFeatures?: NonAttribute<any[]>; // UsersFeatures[]
}

Features.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "features",
    timestamps: false,
  }
);

export default Features;
