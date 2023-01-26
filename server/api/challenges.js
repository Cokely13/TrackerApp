const router = require('express').Router()
const { models: { Challenge}} = require('../db')


router.get('/', async (req, res, next) => {
  try {
    const challenges = await Challenge.findAll()
    res.json(challenges)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Challenge.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id)
    res.send(await challenge.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    await challenge.destroy();
    res.send(challenge);
  } catch (error) {
    next(error);
  }
});







module.exports = router
