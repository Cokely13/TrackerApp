const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  eventName: {
    type: Sequelize.STRING,
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
  image: {
    type: Sequelize.TEXT,
    defaultValue: 'https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg',
  },
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

module.exports = Event
