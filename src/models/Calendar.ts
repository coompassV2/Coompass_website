
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";
import Mission from "./Mission";

interface CalendarAttributes {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  entryType: string;
  missionId: string;
}

export class Calendar extends Model<CalendarAttributes> implements CalendarAttributes {
  declare id: string;
  declare userId: string;
  declare createdAt: string;
  declare updatedAt: string;
  declare entryType: string;
  declare missionId: string;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
  declare readonly mission?: NonAttribute<Mission>;
}

Calendar.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    missionId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "missions",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "calendars",
    timestamps: false,
  }
);

export default Calendar;
