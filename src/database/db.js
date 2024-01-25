import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "orange_portfolio",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "admin",
  {
    dialect: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
  }
);

export default sequelize;
