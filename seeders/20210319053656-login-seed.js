"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Logins",
      [
        {
          fullName: "james Cameron",
          email: "james@mail.com",
          password: "jamespass",
          token: "kfkdhhfk",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "john gorg",
          email: "john@mail.com",
          password: "johnpass",
          token: "fdasjfhsajdf",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "angel",
          email: "angel@mail.com",
          password: "angelpass",
          token: "awrarar",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Logins", null, "");
  },
};
