//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Result = require('./models/Result')
const RegisteredEvent = require('./models/RegisteredEvent')

//associations could go here!
// Event.hasMany(User)
Event.hasMany(Result)
Event.hasMany(RegisteredEvent)
User.hasMany(Result)
User.hasMany(RegisteredEvent)
RegisteredEvent.hasOne(User)
// User.hasMany(Event)
// Result.hasOne(Event)
Result.hasOne(User)

module.exports = {
  db,
  models: {
    User,
    Event,
    Result,
    RegisteredEvent
  },
}
