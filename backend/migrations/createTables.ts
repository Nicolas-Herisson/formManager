import sequelize from "../database/client";
import "../models/associations.model";

await sequelize.dropAllSchemas({});

await sequelize.sync({ force: true });

console.log("Tables created successfully.");

await sequelize.close();
