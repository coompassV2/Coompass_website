
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";

interface CompanyAttributes {
  id: string;
  name: string;
  description: string;
  creator: string;
  employees: string[];
  image: string;
  type: string;
  sdg: string[];
}

export class Company extends Model<CompanyAttributes> implements CompanyAttributes {
  declare id: string;
  declare name: string;
  declare description: string;
  declare creator: string;
  declare employees: string[];
  declare image: string;
  declare type: string;
  declare sdg: string[];
  
  // Virtual fields for associations
  declare readonly creatorUser?: NonAttribute<User>;
  declare readonly missions?: NonAttribute<any[]>; // Mission[]
  declare readonly certificates?: NonAttribute<any[]>; // Certificate[]
  declare readonly districts?: NonAttribute<any[]>; // District[] through CompanyDistricts
  declare readonly users?: NonAttribute<any[]>; // User[] through UserCompany
  declare readonly partnerOrgs?: NonAttribute<any[]>; // Company[] through Partnership
  declare readonly partneredWithOrgs?: NonAttribute<any[]>; // Company[] through Partnership
}

Company.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    creator: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    employees: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sdg: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
  }
);

export default Company;
