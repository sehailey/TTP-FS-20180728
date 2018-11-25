const router = require('express').Router()
const { User, Stock } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/stocks', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } })
    const stocks = await user.getStocks({ attributes: ['id', 'symbol'] })
    res.json(stocks)
  } catch (err) {
    next(err)
  }
})
