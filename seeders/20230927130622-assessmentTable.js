"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("assessments", [
      {
        id: 1,
        name: "Math",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "Biology",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "History",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("assessments", null, {});
  },
};
