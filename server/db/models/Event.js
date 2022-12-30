const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  eventName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
})

module.exports = Event
