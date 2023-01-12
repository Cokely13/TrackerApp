import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import eventsReducer from './allEventsStore'
import resultsReducer from './allResultsStore'
import usersReducer from './allUsersStore'
import singleEventReducer from './singleEventStore'
import singleUserReducer from './singleUserStore'
import registeredEventsReducer from './allRegisteredEventsStore'
import singleRegisteredEventReducer from './singleRegisteredEventStore'
import recordsReducer from './allRecordsStore'
import singleRecordReducer from './singleRecordStore'
import singleResultReducer from './singleResultsStore'

const reducer = combineReducers({ auth,
allEvents: eventsReducer,
allResults: resultsReducer,
allRecords: recordsReducer,
allUsers: usersReducer,
singleEvent: singleEventReducer,
singleUser: singleUserReducer,
singlRecord: singleRecordReducer,
singleResult: singleResultReducer,
registeredEvents: registeredEventsReducer,
singleRegisteredEvent: singleRegisteredEventReducer })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './allEventsStore'
export * from './allResultsStore'
export * from './singleRegisteredEventStore'
