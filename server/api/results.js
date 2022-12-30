const router = require('express').Router()
const { models: { Result }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const results = await Result.findAll()
    res.json(results)
  } catch (err) {
    next(err)
  }
})
