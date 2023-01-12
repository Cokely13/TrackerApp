const router = require('express').Router()
const { models: { User, RegisteredEvent }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'gender', 'email', 'birthday', 'imageUrl'],
      include: RegisteredEvent
    })
    res.json(users)
    // console.log("HELLO", users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await User.findByPk(req.params.id);
    res.json(event);
  } catch (err) {
    next(err);
  }
});
