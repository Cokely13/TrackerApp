const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/challenges', require('./challenges'))
router.use('/events', require('./events'))
router.use('/results', require('./results'))
router.use('/records', require('./records'))
router.use('/registered', require('./registered'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
