import sequelize from "../database/client.js";
import { Form, Question, Response } from "../models/associations.model.js";

await sequelize.dropAllSchemas({ force: true });
await sequelize.sync({ force: true });

console.log("Tables created successfully.");

await sequelize.close();