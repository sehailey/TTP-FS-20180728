const db = require('../db')
const Sequelize = require('sequelize')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Stock
