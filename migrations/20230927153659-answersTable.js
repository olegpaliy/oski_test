"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      questionId: {
        field: "question_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "questions", key: "id" },
      },

      userAssessmentId: {
        field: "user_assessment_id",
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "users_assessments", key: "id" },
      },

      answer: {
        allowNull: true,
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
    await queryInterface.dropTable("answers");
  },
};
