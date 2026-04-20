
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import Company from "./Company";

interface PartnershipAttributes {
  companyId: string;
  partnerOrgId: string;
}

export class Partnership extends Model<PartnershipAttributes> implements PartnershipAttributes {
  declare companyId: string;
  declare partnerOrgId: string;

  // Virtual fields for associations
  declare readonly company?: NonAttribute<Company>;
  declare readonly partnerOrg?: NonAttribute<Company>;
}

Partnership.init(
  {
    companyId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Company,
        key: "id",
      },
    },
    partnerOrgId: {
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
    tableName: "partnerships",
    timestamps: false,
  }
);

export default Partnership;
