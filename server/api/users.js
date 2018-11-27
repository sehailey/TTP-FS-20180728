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
    const { symbol, quantity, price } = req.body
    const stock = await Stock.create({
      symbol,
      quantity: parseInt(quantity),
      price: parseFloat(price)
    })
    await user.addStock(stock)
    res.status(201).json(stock)
  } catch (err) {
    next(err)
  }
})
