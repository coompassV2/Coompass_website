
import { Model, DataTypes, NonAttribute } from "sequelize";
import { sequelize } from "@/lib/sequelize";
import User from "./User";

interface AssistantThreadsAttributes {
  threadId: string;
  userId: string;
  title: string;
}

export class AssistantThreads extends Model<AssistantThreadsAttributes> implements AssistantThreadsAttributes {
  declare threadId: string;
  declare userId: string;
  declare title: string;

  // Virtual fields for associations
  declare readonly user?: NonAttribute<User>;
}

AssistantThreads.init(
  {
    threadId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "assistant_threads",
    timestamps: true,
  }
);

export default AssistantThreads;
