import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_DIALECT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    //host: process.env.DATABASE_HOST,
    //port: process.env.DATABASE_PORT,
    define: {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;

