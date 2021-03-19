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
      "Products",
      [
        {
          title: "bakso",
          price: 3000,
          image: "upload/images/image.png",
          userId: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "sate",
          price: 4000,
          image: "upload/images/image.png",
          userId: 34,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "kare",
          price: 5000,
          image: "upload/images/image.png",
          userId: 35,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "soto",
          price: 2000,
          image: "upload/images/image.png",
          userId: 36,
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
    await queryInterface.bulkDelete("Products", null, {});
  },
};
