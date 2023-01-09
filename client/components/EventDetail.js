import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { updateSingleEvent } from '../store/singleEventStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'
import { fetchResults } from '../store/allResultsStore'


export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
    };

     this.handleSubmit = this.handleSubmit.bind(this);
}


componentDidMount(props){
  this.props.fetchEvent(this.props.match.params.eventId)
  this.props.fetchResults()
  // console.log("check", this.props)
}

handleSubmit(event) {
  event.preventDefault();
  const newReg = {
    eventName: this.props.singleEvent.eventName,
    description: this.props.singleEvent.description,
    eventId: this.props.singleEvent.id,
    userId: this.props.userId
  }
  this.props.createRegisteredEvent(newReg)
}


render () {
  console.log("id", this.props.match.params.eventId)
  const eventId = this.props.match.params.eventId
  console.log("eventId", eventId)
  const myResults = this.props.allResults.filter(result => result.eventId == eventId)
      console.log(this.props.allResults)
      console.log(myResults)
  return (
    <div>
    <div className ="card grid text-center" style={{width: "18rem"}}  >
  <div className="card-body">
    <h5 className="card-title">{this.props.singleEvent.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {this.props.singleEvent.type}</h5>
    <p className="card-text">{this.props.singleEvent.description}</p>
    <h5 className="card-subtitle mb-2 text-muted">End Date: {this.props.singleEvent.endDate}</h5>
    <Link className="btn btn-primary" onClick={this.handleSubmit} to='/profile' >Register</Link>
    {/* <Link className="card-link" to={`/results/add/${this.props.singleEvent.id}`}>Add Result</Link> */}
  </div>
</div>
<h2>Results</h2>
{myResults.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title"><Link to={`/users/${event.userId}`} >User Name: {event.userName}</Link></h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {event.eventId}</h6>
 <h6 className="card-text">Time: {event.time}</h6>
 </div>
 </div>
)})}
</div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  allResults: state.allResults
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history)),
    fetchResults: () => dispatch(fetchResults())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
