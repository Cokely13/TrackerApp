import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { fetchResults } from '../store/allResultsStore';


export class UsersPage extends React.Component {
  constructor() {
    super();
    this.state = {

        id: "",
        completed: true,

    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

    componentDidMount(){
      this.props.fetchRegisteredEvents()
      this.props.fetchSingleUser(this.props.match.params.userId)
      this.props.fetchResults()
    }

    handleSubmit(event,  ){
      event.preventDefault();
      console.log("HO!!!", event)
      // this.setState
    }

    render () {
      const myId = this.props.match.params.userId
      console.log("MY ID", myId)
      const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId == myId)
      const myResults = this.props.allResults.filter(result => result.userId == myId)
      console.log(myResults)


  return (

    <div>
      <h1>{this.props.singleUser.username}</h1>
      <h2>EVENTS</h2>
    {myRegisteredEvents.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title">{event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">{event.description}</h6>
 <h6 className="card-text">{event.completed ? <p>DONE</p> :<p>NOT DONE </p>}</h6>
 {/* <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link> */}
 {/* <Link className="card-link" to={`/results/add/${event.eventId}`}>Add Result</Link>
 <h1></h1>
 <Link className="card-link" to={`/completed/${event.eventId}`}>Complete Event</Link> */}
</div>
</div>)})}
<h2>Results</h2>
{myResults.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title">Event Name: {event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {event.id}</h6>
 <h6 className="card-text">Time: {event.time}</h6>
 </div>
 </div>
)})}
</div>

)
}}

const mapState = (state) => {
  return{
    registeredEvents: state.registeredEvents,
    userId: state.auth.id,
    singleUser: state.singleUser,
    allResults: state.allResults
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents()),
    fetchSingleUser: (id) => {dispatch(fetchSingleUser(id))},
    updateSingleRegisteredEvent: (event) => (dispatch(updateSingleRegisteredEvent((event, history)))),
    fetchResults: () => dispatch(fetchResults()),
  };
};

export default connect(mapState, mapDispatch)(UsersPage)
