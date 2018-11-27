const db = require('../db')
const Sequelize = require('sequelize')

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('price') * this.getDataValue('quantity')
    }
  }
})

module.exports = Stock
