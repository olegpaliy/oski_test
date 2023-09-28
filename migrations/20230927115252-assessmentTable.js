"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("assessments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("assessments");
  },
};
