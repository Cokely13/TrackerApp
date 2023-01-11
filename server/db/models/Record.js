const Sequelize = require('sequelize')
const db = require('../db')

const Record = db.define('record', {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
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
  },
  time: {
    type: Sequelize.STRING,
    defaultValue: "N/A"
  },
  userName: {
    type: Sequelize.STRING,
  },
  type: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg',
  },
})

module.exports = Record
