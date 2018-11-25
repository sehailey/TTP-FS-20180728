const router = require('express').Router()
const { User, Stock } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // attributes: ['id', 'email'],
      include: { model: Stock }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
