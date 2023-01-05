const Sequelize = require('sequelize')
const db = require('../db')

const RegisteredEvent = db.define('registeredevent', {
  eventName: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false
  },
  // eventId: {
  //   type: Sequelize.INTEGER,
  //   unique: true,
  //   allowNull: false
  // },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  comments: {
    type: Sequelize.STRING,
  },
  dateCompleted: {
    type: Sequelize.DATEONLY,
  },
})

module.exports = RegisteredEvent
