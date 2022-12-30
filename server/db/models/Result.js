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
})

module.exports = Result
