const router = require('express').Router()
const { models: { Record, Event }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const records = await Record.findAll({include: Event})
    res.json(records)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const records = await Record.findByPk(req.params.id);
    res.json(records);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Record.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id);
    res.send(await record.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const record = await Record.findByPk(req.params.id);
    await record.destroy();
    res.send(record);
  } catch (error) {
    next(error);
  }
});







module.exports = router
