
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";

interface ZohoTokenAttributes {
  id: string;
  refresh_token: string;
  token: string;
  expires: Date;
}

export class ZohoToken extends Model<ZohoTokenAttributes> implements ZohoTokenAttributes {
  declare id: string;
  declare refresh_token: string;
  declare token: string;
  declare expires: Date;
}

ZohoToken.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "zoho_tokens",
    timestamps: true,
  }
);

export default ZohoToken;
