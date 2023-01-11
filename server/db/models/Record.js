const Sequelize = require('sequelize')
const db = require('../db')

const Record = db.define('record', {
  eventName: {
    type: Sequelize.STRING,
  },
  eventId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
  },
  userName: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.STRING,
  },
})

module.exports = Record
