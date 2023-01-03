//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Result = require('./models/Result')

//associations could go here!
// Event.hasMany(User)
Event.hasMany(Result)
User.hasMany(Result)
// User.hasMany(Event)
// Result.hasOne(Event)
Result.hasOne(User)

module.exports = {
  db,
  models: {
    User,
    Event,
    Result
  },
}
