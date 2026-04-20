
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";

// Import related models to fix TypeScript errors
import UserLog from "./UserLog";
import Permission from "./Permission";
import UsersFeatures from "./UsersFeatures";
import AssistantThreads from "./AssistantThreads";
import Company from "./Company";

interface UserAttributes {
  id: string;
  signature: string;
  key: string;
  address: string;
  email: string;
  type: string;
  username: string;
  mobilePhone: string;
  profileImage: string;
  bio: string;
  role: string;
  onboarding: boolean;
  companies: string[];
  skills: string[];
  createdAt: Date;
  lastLogin: Date;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  declare id: string;
  declare signature: string;
  declare key: string;
  declare address: string;
  declare email: string;
  declare type: string;
  declare username: string;
  declare mobilePhone: string;
  declare profileImage: string;
  declare bio: string;
  declare role: string;
  declare onboarding: boolean;
  declare companies: string[];
  declare skills: string[];
  declare createdAt: Date;
  declare lastLogin: Date;

  // Virtual fields for associations
  declare readonly userLogs?: NonAttribute<UserLog[]>;
  declare readonly permissions?: NonAttribute<Permission>;
  declare readonly userFeatures?: NonAttribute<UsersFeatures[]>;
  declare readonly assistantThreads?: NonAttribute<AssistantThreads[]>;
  declare readonly createdCompanies?: NonAttribute<Company[]>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobilePhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    onboarding: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    companies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
