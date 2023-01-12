import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { fetchResults, deleteResult } from '../store/allResultsStore';
import { fetchRecords } from '../store/allRecordsStore';
import {Image} from 'react-bootstrap'
import RegisterUpdate from './RegisterUpdate';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      reset: true

    };

    this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

    componentDidMount(){
      this.props.fetchRegisteredEvents()
      this.props.fetchSingleUser(this.props.userId)
      this.props.fetchResults()
      this.props.fetchRecords()
    }

    handleClick(event, registered){
      event.preventDefault()
      console.log("TEST", registered)
      const reg = registered.id

      registered.completed = true

      // // this.props.fetchSingleUser(reg)
      this.props.updateSingleRegisteredEvent(registered)
      this.setState({
          reset: !this.state.reset
      })

      }

      // handleSubmit(id) {
      //   this.props.deleteResult(id)
      //  }



    render () {
      const today = new Date();
      const  todayDate = today.toISOString().substring(0, 10);
      const myId = this.props.userId
      const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == false)
      const myCompletedEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == true)
      const myResults = this.props.allResults.filter(result => result.userId === myId)
      const myRecords = this.props.allRecords.filter(record => record.userId == myId)
      // const myRecords = filteredRecords[0]

      console.log("my records", this.props.allRecords)
      console.log("my records", myRecords)

  return (

    <div>
      <h1>{this.props.singleUser.username}</h1>
      <Image roundedCircle id="userProfileImage"  style={{width: "18rem"}} src={this.props.singleUser.imageUrl}/>
      <h1>Birthday: {this.props.singleUser.birthday}</h1>
      <h1>Gender:{this.props.singleUser.gender}</h1>
      <h2> Active EVENTS</h2>
    {myRegisteredEvents.map((registered) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={registered.id} >
  <img src={registered.image} className="card-img-top" />
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.eventId}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
 <Link className="card-link" to={`/events/${registered.eventId}`}>Event Detail</Link>
 <h6 className="card-text">{ registered.endDate >= todayDate ? <p>Active</p> :<p></p>}</h6>
 <h6> {registered.endDate >= todayDate ?  <Link className="card-link" to={`/results/add/${registered.eventId}`}>Add Result</Link>:<p>Past </p>}</h6>
 <h1></h1>
 <button onClick={event => this.handleClick(event, registered)}>Complete Event</button>
</div>
</div>)})}
<h2>Results</h2>
{myResults.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title">Event Name: {event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {event.eventId}</h6>
 <h6 className="card-text">Time: {event.time}</h6>
 <Link className="card-link" to={`/events/${event.eventId}`}>Event Detail</Link>
 <Link className="card-link" to={`/results/${event.id}`}>Edit Result</Link>
 <p></p>
<p></p>
 <button type="button" className="btn btn-danger" onClick={() => this.props.deleteResult(event.id)}>Delete Result</button>
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
 <Link className="card-link" to={`/events/${registered.id}`}>Event Detail</Link>
</div>
</div>)})}
<h2> Your Records</h2>
  {myRecords.length ? myRecords.map((record) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={record.id} >
<div className="card-body">
 <h5 className="card-title">Event Name:{record.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {record.eventId}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Time:{record.time}</h6>
 <Link className="card-link" to={`/events/${record.eventId}`}>Event Detail</Link>
</div>
</div>)}) : <h5>No Records Yet. Step it up Pal!</h5>}
</div>

)
}}

const mapState = (state) => {
  return{
    registeredEvents: state.registeredEvents,
    userId: state.auth.id,
    singleUser: state.singleUser,
    allResults: state.allResults,
    allRecords: state.allRecords
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents()),
    fetchSingleUser: (id) => {dispatch(fetchSingleUser(id))},
    updateSingleRegisteredEvent: (id) => (dispatch(updateSingleRegisteredEvent((id)))),
    fetchResults: () => dispatch(fetchResults()),
    fetchRecords: () => dispatch(fetchRecords()),
    deleteResult: (id) => dispatch(deleteResult(id, history))
  };
};

export default connect(mapState, mapDispatch)(Profile)
