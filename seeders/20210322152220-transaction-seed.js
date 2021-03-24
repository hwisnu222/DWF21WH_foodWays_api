'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    :
     await queryInterface.bulkInsert('People', [await queryInterface.bulkInsert(
      "userorders",
      [
        {
          userId: 41,
          orderId: 1,
          status: "on the way",
        },
        {
          userId: 42,
          orderId: 2,
          status: "success",
        },
        {
          userId: 43,
          orderId: 2,
          status: "failed",
        },
        {
          userId: 43,
          orderId: 1,
          status: "failed",
        },
      ],
      {}
    )], {});
 
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Transaction', null, {});
  }
};
