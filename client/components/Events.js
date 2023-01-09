import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchEvents } from '../store/allEventsStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'
import { fetchRegisteredEvents } from '../store/allRegisteredEventsStore';


export class Events extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
  this.props.fetchEvents()
  this.props.fetchRegisteredEvents()
}

// handleSubmit(event) {
//   event.preventDefault();
//   console.log("CHECK", event)
// }


render () {
  const myId = this.props.userId
  const allEvents = this.props.allEvents

  const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId)

  const eventsAvailable  = allEvents.filter(function(event){
    return myRegisteredEvents.filter(function(reg){
       return reg.eventId == event.id;
    }).length == 0
 });



  return (
    <div>
       {eventsAvailable.map((event) => {
        return (
    <div className ="card" style={{width: "18rem"}} key={event.id} >
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {event.type}</h5>
    <h5 className="card-subtitle mb-2 text-muted">End Date; {event.endDate}</h5>
    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
    <p className="card-text">{event.description}</p>
    <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
    <h1></h1>
    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
  </div>
</div>)})}
 <Link className="btn btn-primary" to={`/events/create`}>Create Event</Link>
</div>
)
}}

const mapState = (state) => {
  return{
    allEvents: state.allEvents,
    registeredEvents: state.registeredEvents,
    userId: state.auth.id,
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents()),
    // createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history))
  };
};

export default connect(mapState, mapDispatch)(Events)
