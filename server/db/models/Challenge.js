const Sequelize = require('sequelize')
const db = require('../db')

const Challenge = db.define('challenge', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  eventId : {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  challenger: {
    type: Sequelize.STRING,
    allowNull: false
  },
  challengerId: {
    type: Sequelize.INTEGER,
    // allowNull: false
  },
    // : {
    //   type: Sequelize.ENUM("pending", "active", "disabled"),
    // },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Random'
  },
  challenged: {
      type: Sequelize.STRING,
      allowNull: false
    },
  accepted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
  // record: {
  //   type: Sequelize.STRING,
  //   defaultValue: "N/A"
  // },
  // recordHolderId: {
  //   type: Sequelize.STRING,
  //   defaultValue: "N/A"
  // },
  // recordHolderName: {
  //   type: Sequelize.STRING,
  //   defaultValue: "N/A"
  // }

})

module.exports = Challenge
