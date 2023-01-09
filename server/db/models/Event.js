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
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
    // : {
    //   type: Sequelize.ENUM("pending", "active", "disabled"),
    // },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  //   )
  // },
})

module.exports = Event
