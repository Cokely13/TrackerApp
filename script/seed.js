'use strict'

const {db, models: {User, Event, Result, RegisteredEvent} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', password: 'test' }),
    User.create({ username: 'Scott', password: '123' }),
    User.create({ username: 'Matt', password: '123' }),
  ])

  const events = await Promise.all([
    Event.create({ eventName: '5k', description: 'time' }),
    Event.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m' }),
  ])

  const results = await Promise.all([
    Result.create({ eventName: '5k', time: '21:00', eventId: '1', userId: '1' }),
    Result.create({ eventName: '5k', time: '25:00', eventId: '1', userId: '2'  }),
    Result.create({ eventName: '5k', time: '27:00', eventId: '1', userId: '3'  }),
  ])

  const registeredEvents = await Promise.all([
    RegisteredEvent.create({ eventName: '5k', description: 'time', userId: "1", eventId: "1" }),
    RegisteredEvent.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m' }),
    RegisteredEvent.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m', eventId: "2", userId: "2" }),
    RegisteredEvent.create({ eventName: 'Bike', description: '30 miles', eventId: "3", userId: "2", completed: true })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
