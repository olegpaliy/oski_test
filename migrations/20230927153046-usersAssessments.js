"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users_assessments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      userId: {
        field: "user_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" },
      },

      assessmentId: {
        field: "assessment_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "assessments", key: "id" },
      },

      completed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        field: "created_at",
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        field: "updated_at",
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users_assessments");
  },
};
