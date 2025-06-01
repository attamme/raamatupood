'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('RAAMATUD', 'pildi_fail', {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: null,
      comment: 'Raamatu pildi failinimi'
    })
    await queryInterface.addColumn('RAAMATUD', 'kirjeldus', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: 'Raamatu kirjeldus'
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('RAAMATUD', 'pildi_fail');
    await queryInterface.removeColumn('RAAMATUD', 'kirjeldus');
  }
};
