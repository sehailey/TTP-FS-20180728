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
    console.log(req.body)
    const { symbol, quantity, price } = req.body
    console.log('XXXXXXXXXXXXX ', symbol, quantity, price)
    user.addStock({
      symbol,
      quantity,
      price
    })
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})
