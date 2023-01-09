'use strict'

const {db, models: {User, Event, Result, Registered} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', gender: 'male', email: "ryan.cokely@gmail.com", birthday: "June 1, 1983",  password: '123' }),
    User.create({ username: 'Scott',gender: 'male', email: "scottlcokely@gmail.com", birthday: "June 1, 1983", password: '123' }),
    User.create({ username: 'Matt', gender: 'male', email: "mclaise@gmail.com", birthday: "June 1, 1983", password: '123' }),
  ])

  const events = await Promise.all([
    Event.create({ eventName: '15k', description: 'time', endDate: "Jan 10, 2023", type: "row" }),
    Event.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m', endDate: "Jan 12, 2023", type: "Random" }),
    Event.create({ eventName: '10k', description: 'run',  endDate: "Jan 10, 2023", type: "run" }),
    Event.create({ eventName: '30K', description: 'bike',  endDate: "Jan 10, 2023", type: "Bike" }),

  ])

  // const results = await Promise.all([
  //   Result.create({ eventName: '5k', time: '21:00', eventId: '1', userId: '1' }),
  //   Result.create({ eventName: '5k', time: '25:00', eventId: '1', userId: '2'  }),
  //   Result.create({ evenstName: '5k', time: '27:00', eventId: '1', userId: '3'  }),
  // ])

  // const registered = await Promise.all([
  //   Registered.create({ eventName: '5k', description: 'time', userId: "1", eventId: "1" }),
  //   Registered.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m' }),
  //   // RegisteredEvent.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m', eventId: "2", userId: "2" }),
  //   // RegisteredEvent.create({ eventName: 'Bike', description: '30 miles', eventId: "3", userId: "2", completed: true })
  // ])

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
