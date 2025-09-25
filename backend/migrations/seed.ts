import sequelize from "../database/client";

async function seedDatabase() {
  try {
    const transaction = await sequelize.transaction();

    try {
      const now = new Date().toISOString();

      await sequelize.query(
        `INSERT INTO roles (name, "createdAt", "updatedAt") 
        VALUES ('admin', :now, :now), ('user', :now, :now)`,
        { replacements: { now }, transaction }
      );

      await transaction.commit();
      console.log("Database seeded successfully!");
    } catch (error) {
      await transaction.rollback();
      console.error("Error seeding database:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
