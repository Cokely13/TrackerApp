const Sequelize = require('sequelize')
const db = require('../db')

const Result = db.define('result', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
  },
})

module.exports = Result
