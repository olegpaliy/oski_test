"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("questions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      body: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      assessmentId: {
        field: "assessment_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "assessments", key: "id" },
      },

      correctAnswer: {
        field: "correct_answer",
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
    await queryInterface.dropTable("questions");
  },
};
