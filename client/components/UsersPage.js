import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { fetchResults } from '../store/allResultsStore';
import { fetchRecords } from '../store/allRecordsStore';


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
      this.props.fetchRecords()
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
      const myRecords = this.props.allRecords.filter(record => record.userId == myId)
      myRegisteredEvents.sort(function (x, y) {
        let a = new Date(x.endDate),
            b = new Date(y.endDate);
        return a - b;
    });

  return (

    <div style={{marginTop: "200px"}}>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>{this.props.singleUser.username}'s Activities</h1>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'10px', marginBottom:'10px'}}><u>EVENTS</u></h2>
      <div className ="row container text-center ">
    {myRegisteredEvents.map((event) => {
     return (
      <div className="col" key={event.id} >
 <div className ="card" style={{width: "18rem"}}>
<div className="card-body">
 <h5 className="card-title">{event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">{event.description}</h6>
 <h6 className="card-subtitle mb-2 text-muted">{event.endDate}</h6>
 <h6 className="card-text">{event.completed ? <p>DONE</p> :<p>NOT DONE </p>}</h6>
</div>
</div>
</div>)})}
</div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:'15px', marginBottom:'15px'}}><u>Results </u></h2>
<div className="container text-center">
  <div className="row align-items-start">
    <h3 className="col">
     Event Name
    </h3>
    <h3 className="col">
      Time
    </h3>
    </div>
    </div>
{myResults.map((event) => {
     return (
      <div className ="container text-center" key={event.id} >
<div className="row align-items-start">
 <h3 className="col">{event.eventName}</h3>
 <h3 className="col">{event.time}</h3>
 {/* <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title">Event Name: {event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {event.id}</h6>
 <h6 className="card-text">Time: {event.time}</h6> */}
 </div>
 </div>
)})}
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'10px', marginBottom:'10px'}}><u> Records</u></h2>
  {myRecords.length ? myRecords.map((record) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={record.id} >
<div className="card-body">
 <h5 className="card-title">Event Name:{record.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {record.eventId}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Time:{record.time}</h6>
</div>
</div>)}) : <h5>No Records Yet. Needs to step it up!</h5>}
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
    updateSingleRegisteredEvent: (event) => (dispatch(updateSingleRegisteredEvent((event, history)))),
    fetchResults: () => dispatch(fetchResults()),
    fetchRecords: () => dispatch(fetchRecords())
  };
};

export default connect(mapState, mapDispatch)(UsersPage)
