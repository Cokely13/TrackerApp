import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { fetchResults } from '../store/allResultsStore';
import RegisterUpdate from './RegisterUpdate';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      reset: true

    };

    this.handleClick = this.handleClick.bind(this);

  }

    componentDidMount(){
      this.props.fetchRegisteredEvents()
      this.props.fetchSingleUser(this.props.userId)
      this.props.fetchResults()
    }

    handleClick(event, registered){
      event.preventDefault()
      console.log("TEST", registered)
      const reg = registered.id

      registered.completed = true

      // // this.props.fetchSingleUser(reg)
      this.props.updateSingleRegisteredEvent(registered)
      console.log("ID!!", this.state.reset)
      this.setState({
          reset: !this.state.reset
      })

      }


    // handleSubmit(event, ){
    //     event.preventDefault();
    //   this.props.updateSingleRegisteredEvent
    // }

    render () {
      const myId = this.props.userId
      const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == false)
      const myCompletedEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == true)
      const myResults = this.props.allResults.filter(result => result.userId === myId)
      // console.log("HEY", myRegisteredEvents)
      // const check = this.props.updateSingleRegisteredEvent()
      // console.log("chec", check)


  return (

    <div>
      <h1>{this.props.singleUser.username}</h1>
      <h2> Active EVENTS</h2>
    {myRegisteredEvents.map((registered) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={registered.id} >
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.id}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
 <h6 className="card-text">{registered.completed ? <p>DONE</p> :<p>NOT DONE </p>}</h6>
 {/* <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link> */}
 <Link className="card-link" to={`/results/add/${registered.eventId}`}>Add Result</Link>
 <h1></h1>
 {/* <div>
 <RegisterUpdate need={event}/>
 </div> */}
 <button onClick={event => this.handleClick(event, registered)}>Complete Event</button>
 {/* <Link className="card-link" to={`/completed/${event.eventId}`}>Complete Event</Link> */}
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
      <h2> Completed EVENTS</h2>
    {myCompletedEvents.map((registered) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={registered.id} >
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.id}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
</div>
</div>)})}
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
    updateSingleRegisteredEvent: (id) => (dispatch(updateSingleRegisteredEvent((id)))),
    fetchResults: () => dispatch(fetchResults()),
  };
};

export default connect(mapState, mapDispatch)(Profile)
