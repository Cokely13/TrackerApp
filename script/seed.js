'use strict'

const {db, models: {User, Event, Result, Registered,} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  //Creating Images

  // const images = await Promise.all([Image.create({})])

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', gender: 'male', email: "ryan.cokely@gmail.com", birthday: "June 1, 1983",  password: '123' }),
    User.create({ username: 'Scott',gender: 'male', email: "scottlcokely@gmail.com", birthday: "June 1, 1983", password: '123' }),
    User.create({ username: 'Matt', gender: 'male', email: "mclaise@gmail.com", birthday: "June 1, 1983", password: '123' }),
  ])

  const events = await Promise.all([
    Event.create({ eventName: '15k', description: 'time', endDate: "Jan 10, 2023", type: "row", createdBy: "1", image: "https://www.byrdie.com/thmb/wt0s4-TZV_nQt3NXswXUYHil48Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TheseOnlineRowingClassesWillHelpYouGetTonedinNoTime-a2959753b88f4ebb8ac9532971123761.jpg", imageId: 1 }),
    Event.create({ eventName: 'Row/Run', description: '500 m, 1 mile run, 500 m', endDate: "Jan 12, 2023", type: "Random", createdBy: "1",image: "https://res.cloudinary.com/upskilled/image/fetch/w_600,h_400,c_crop,c_fill,g_face:auto,f_auto/https://www.upskilled.edu.au/getmedia%2Ff4633697-8724-4633-8488-825ec4a1587f%2Fchallenge-yourself-in-your-next-role-HERO.jpg%3B.aspx%3Fwidth%3D1000%26height%3D667%26ext%3D.jpg", imageId: 1 }),
    Event.create({ eventName: '10k', description: 'run',  endDate: "Jan 10, 2023", type: "Run", createdBy: "2", imageId: 1 }),
    Event.create({ eventName: '30K', description: 'bike',  endDate: "Jan 10, 2023", type: "Bike", createdBy: "3", image: "https://c.ndtvimg.com/2020-08/dtm9edd8_cycling_625x300_05_August_20.jpg?ver-20221221.02", imageId: 1 }),
    Event.create({ eventName: '1k', description: 'swim',  endDate: "Jan 8, 2023", type: "Swim", createdBy: "2", image: "https://www.shape.com/thmb/y7XHTgiQzL_gLqtB7AVR1LBYZHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/swimming-workouts-for-women-d137e32a8fcf4d68bf4713ce2c628a07.jpg", imageId: 1 }),

  ])

  // const records = await Promise.all([
  //   Record.create({ eventName: '15k', time: 'N/A', eventId: '1', userId: '1', type: 'row', userName: "Matt", endDate: "Jan 8, 2023", createdBy: "2"}),
  //   Record.create({ eventName: 'Row/Run', time: 'N/A', eventId: '2', userId: '2', type: 'random', userName: "Scott", endDate: "Jan 8, 2023", createdBy: "2" }),
  //   Record.create({ eventName: '10K', time: 'N/A', eventId: '3', userId: '3', type: 'Run', userName: "Ryan", endDate: "Jan 8, 2023", createdBy: "2" }),
  //   Record.create({ eventName: '30K', time: 'N/A', eventId: '4', userId: '3', type: 'Bike', userName: "Ryan", endDate: "Jan 8, 2023", createdBy: "2" }),
  //   Record.create({ eventName: '1K', time: 'N/A', eventId: '5', userId: '3', type: 'Swim', userName: "Ryan", endDate: "Jan 8, 2023", createdBy: "2" }),
  // ])

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
