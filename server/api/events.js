const router = require('express').Router()
const { models: { Event, RegisteredEvent}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({include: RegisteredEvent})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.json(event);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Event.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.send(await event.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    await event.destroy();
    res.send(event);
  } catch (error) {
    next(error);
  }
});







module.exports = router
