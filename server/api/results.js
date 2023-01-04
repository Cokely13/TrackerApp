const router = require('express').Router()
const { models: { Result, User }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const results = await Result.findAll()
    const sort = results.sort((a,b) => a < b )
    res.json(sort)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Result.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    res.send(await result.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await Result.findByPk(req.params.id);
    await result.destroy();
    res.send(result);
  } catch (error) {
    next(error);
  }
});







module.exports = router
