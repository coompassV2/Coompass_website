
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import Company from "./Company";
import Districts from "./Districts";

interface CompanyDistrictsAttributes {
  company_id: string;
  district_id: number;
}

export class CompanyDistricts extends Model<CompanyDistrictsAttributes> implements CompanyDistrictsAttributes {
  declare company_id: string;
  declare district_id: number;

  // Virtual fields for associations
  declare readonly company?: NonAttribute<Company>;
  declare readonly district?: NonAttribute<Districts>;
}

CompanyDistricts.init(
  {
    company_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Company,
        key: "id",
      },
    },
    district_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Districts,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "company_districts",
    timestamps: false,
  }
);

export default CompanyDistricts;
