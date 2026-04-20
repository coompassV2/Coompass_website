
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";
import Company from "./Company";

interface UserCompanyAttributes {
  userId: string;
  companyId: string;
}

export class UserCompany extends Model<UserCompanyAttributes> implements UserCompanyAttributes {
  declare userId: string;
  declare companyId: string;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
  declare readonly company?: NonAttribute<Company>;
}

UserCompany.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    companyId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Company,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "user_companies",
    timestamps: false,
  }
);

export default UserCompany;
