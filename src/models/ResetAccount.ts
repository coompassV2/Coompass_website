
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";

interface ResetAccountAttributes {
  email: string;
  confirmationKey: string;
  expires: Date;
}

export class ResetAccount extends Model<ResetAccountAttributes> implements ResetAccountAttributes {
  declare email: string;
  declare confirmationKey: string;
  declare expires: Date;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
}

ResetAccount.init(
  {
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: User,
        key: "email",
      },
    },
    confirmationKey: {
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
    tableName: "reset_accounts",
    timestamps: false,
  }
);

export default ResetAccount;
