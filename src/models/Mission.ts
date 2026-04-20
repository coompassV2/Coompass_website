
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import Company from "./Company";

interface MissionAttributes {
  id: string;
  title: string;
  reward: number;
  state: string;
  creator: string;
  participants: string[];
  companyId: string;
  image: string;
  description: string;
  causes: string[];
  skills: string[];
  createdAt: Date;
  startedAt: Date;
  finishedAt: Date;
  when_start: Date;
  when_finish: Date;
  pointOfContact: string;
}

export class Mission extends Model<MissionAttributes> implements MissionAttributes {
  declare id: string;
  declare title: string;
  declare reward: number;
  declare state: string;
  declare creator: string;
  declare participants: string[];
  declare companyId: string;
  declare image: string;
  declare description: string;
  declare causes: string[];
  declare skills: string[];
  declare createdAt: Date;
  declare startedAt: Date;
  declare finishedAt: Date;
  declare when_start: Date;
  declare when_finish: Date;
  declare pointOfContact: string;

  // Virtual fields for associations
  declare readonly company?: NonAttribute<Company>;
  declare readonly missionLogs?: NonAttribute<any[]>; // MissionLog[]
  declare readonly calendars?: NonAttribute<any[]>; // Calendar[]
  declare readonly missionParticipants?: NonAttribute<any[]>; // MissionParticipants[]
  declare readonly userLogs?: NonAttribute<any[]>; // UserLog[]
}

Mission.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    participants: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Company,
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    causes: {
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
    startedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    when_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    when_finish: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    pointOfContact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "missions",
    timestamps: true,
  }
);

export default Mission;
