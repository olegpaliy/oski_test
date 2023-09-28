"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("questions", [
      {
        title: "Math",
        body: "Is 5 a prime number?",
        correct_answer: true,
        assessment_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Math",
        body: "Does the equation x^2 - 4x + 4 = 0 have real solutions?",
        correct_answer: true,
        assessment_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Math",
        body: "Is the square root of 16 an irrational number?",
        correct_answer: false,
        assessment_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Biology",
        body: "Is photosynthesis the process by which plants convert carbon dioxide and water into glucose and oxygen?",
        correct_answer: true,
        assessment_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Biology",
        body: "Is DNA a molecule that carries genetic information in living organisms?",
        correct_answer: true,
        assessment_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "Biology",
        body: "Are mammals warm-blooded animals?",
        correct_answer: true,
        assessment_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "History",
        body: "Did the American Civil War take place during the 19th century?",
        correct_answer: true,
        assessment_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "History",
        body: "Did Christopher Columbus sail to the Americas in 1492?",
        correct_answer: true,
        assessment_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        title: "History",
        body: "Did the Treaty of Versailles officially end World War II?",
        correct_answer: false,
        assessment_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
