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
      "Users",
      [
        {
          fullName: "james Cameron",
          email: "james@mail.com",
          phone: "2083927820",
          location: "12290382892,920932",
          image: "upload/images/image.png",
          role: "partner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "John gorg",
          email: "john@mail.com",
          phone: "65756756",
          location: "0000909,920932",
          image: "upload/images/image.png",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Angel Hugh",
          email: "angel@mail.com",
          phone: "49949494",
          location: "0384,920932",
          image: "upload/images/image.png",
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Nort Jon",
          email: "nort@mail.com",
          phone: "32081298",
          location: "1019301,920932",
          image: "upload/images/image.png",
          role: "partner",
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};