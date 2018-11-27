const router = require('express').Router()
const { User, Stock } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({ include: { model: Stock } })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/stocks', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } })
    const stocks = await user.getStocks({
      attributes: ['id', 'symbol', 'price', 'quantity']
    })
    res.json(stocks)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/purchase', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } })
    console.log(user.email)
    const { stock, quantity } = req.body
    const price = stock.latestPrice
    const symbol = stock.symbol
    const totalPrice = price * quantity
    const newStock = await Stock.create({ symbol, quantity, price })
    await user.addStock(newStock)
    await user.update({ money: user.money - totalPrice })
    res.status(201).json(newStock)
  } catch (err) {
    next(err)
  }
})
