'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'avatar', {
      type: Sequelize.TEXT,
      allowNull: true,
      unique: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    })
  },
}
