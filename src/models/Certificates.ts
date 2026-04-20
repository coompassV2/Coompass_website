
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import Company from "./Company";

interface CertificatesAttributes {
  id: string;
  createdDate: Date;
  collaborators: number;
  hoursProvided: number;
  initiatives: number;
  causes: string[];
  txHash: string;
  companyId: string;
}

export class Certificates extends Model<CertificatesAttributes> implements CertificatesAttributes {
  declare id: string;
  declare createdDate: Date;
  declare collaborators: number;
  declare hoursProvided: number;
  declare initiatives: number;
  declare causes: string[];
  declare txHash: string;
  declare companyId: string;

  // Virtual fields for associations
  declare readonly company?: NonAttribute<Company>;
}

Certificates.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    collaborators: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hoursProvided: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    initiatives: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    causes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    txHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "certificates",
    timestamps: true,
  }
);

export default Certificates;
