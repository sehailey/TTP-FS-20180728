const User = require('./user')
const Stock = require('./stock')

Stock.belongsToMany(User, { through: 'UserStock' })
User.belongsToMany(Stock, { through: 'UserStock' })

module.exports = {
  User,
  Stock
}
