import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchEvents } from '../store/allEventsStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'


export class Events extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
  this.props.fetchEvents()
}

// handleSubmit(event) {
//   event.preventDefault();
//   console.log("CHECK", event)
// }


render () {

  return (
    <div>
       {this.props.allEvents.map((event) => {
        return (
    <div className ="card" style={{width: "18rem"}} key={event.id} >
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
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
    allEvents: state.allEvents
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    // createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history))
  };
};

export default connect(mapState, mapDispatch)(Events)
