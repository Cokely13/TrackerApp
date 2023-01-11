import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Events from './components/Events';
import Users from './components/Users';
import Results from './components/Results';
import EventDetail from './components/EventDetail';
import CreateEvent from './components/Create Event';
import AddResult from './components/AddResult';
import Profile from './components/Profile';
import CompleteEvent from './components/CompleteEvent';
import UsersPage from './components/UsersPage';
import Calendar from './components/Calendar'
import Records from './components/Records';
import {me} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/cal" component={Calendar} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/:userId" component={UsersPage} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/events/create" component={CreateEvent} />
            <Route exact path="/events/:eventId" component={EventDetail} />
            <Route exact path="/completed/:eventId" component={CompleteEvent} />
            <Route exact path="/results" component={Results} />
            <Route exact path="/records" component={Records} />
            <Route exact path="/results/add/:eventId" component={AddResult} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
