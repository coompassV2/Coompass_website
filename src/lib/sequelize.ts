
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "coompass",
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database via Sequelize has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database via Sequelize:', error);
  }
};

testConnection();

export { sequelize };
