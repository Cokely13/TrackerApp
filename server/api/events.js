const router = require('express').Router()
const { regex } = require('react-admin')
const { models: { Event, RegisteredEvent, Record}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const events = await Event.findAll({include: Record})
    res.json(events)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const eventId = req.params.id
    const event = await Event.findByPk(req.params.id, {include: Record,
    where: {eventId: eventId}});
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
    const event = await Event.findByPk(req.params.id)
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
