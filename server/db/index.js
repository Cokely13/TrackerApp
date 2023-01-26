//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Event = require('./models/Event')
const Challenge = require('./models/Challenge')
const Result = require('./models/Result')
const Record = require('./models/Record')
const RegisteredEvent = require('./models/RegisteredEvent')
// const Image = require('./models/Image')

//associations could go here!
// Event.hasMany(User)
Event.hasMany(Result)
Event.hasOne(Record)
Record.belongsTo(Event)
Event.hasMany(RegisteredEvent)
User.hasMany(Result)
// User.hasMany(Record)
User.hasMany(RegisteredEvent)
RegisteredEvent.belongsTo(User)
// Image.hasMany(Event)
// User.hasMany(Event)
// Result.hasOne(Event)
Result.hasOne(User)

module.exports = {
  db,
  models: {
    User,
    Event,
    Result,
    RegisteredEvent,
    Record,
    Challenge
  },
}
