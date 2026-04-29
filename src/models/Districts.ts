
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";

interface DistrictsAttributes {
  id: string;
  pt: string;
  en: string;
}

export class Districts extends Model<DistrictsAttributes> implements DistrictsAttributes {
  declare id: string;
  declare pt: string;
  declare en: string;

  // Virtual fields for associations
  declare readonly companies?: NonAttribute<any[]>; // Company[] through CompanyDistricts
}

Districts.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    pt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "districts",
    timestamps: false,
  }
);

export default Districts;
