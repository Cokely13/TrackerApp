import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { updateSingleEvent } from '../store/singleEventStore'
import {createRegisteredEvent, fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
// import {fetchRegisteredEvents} from '../store/singleRegisteredEventStore'
import { fetchResults } from '../store/allResultsStore'
import { createRecord } from '../store/allRecordsStore'
import { fetchRecords } from '../store/allRecordsStore'
import { fetchUsers } from '../store/allUsersStore'
import { updateSingleRecord } from '../store/singleRecordStore'
import Records from './Records'
import eventsReducer from '../store/allEventsStore'


export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      record: "",
      recordHolderName: "",
      recordHolderId: ""
    };

     this.handleSubmit = this.handleSubmit.bind(this)
    //  this.handleSubmit2 = this.handleSubmit2.bind(this);
}


componentDidMount(props){
  this.props.fetchEvent(this.props.match.params.eventId)
  this.props.fetchResults()
  this.props.fetchRecords()
  this.props.fetchUsers()
  this.props.fetchRegisteredEvents()
  // console.log("check", this.props)
}

handleSubmit(event) {
  event.preventDefault();
  const newReg = {
    eventName: this.props.singleEvent.eventName,
    description: this.props.singleEvent.description,
    eventId: this.props.singleEvent.id,
    userId: this.props.userId,
    image: this.props.singleEvent.image,
    endDate: this.props.singleEvent.endDate
  }
  this.props.createRegisteredEvent(newReg)
  // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
  // this.props.updateSingleEvent(update)
}

// handleSubmit2(event) {
//   event.preventDefault();
//   this.setState({
//       record: record.time,
//       recordHolderName: record.userName,
//       recordHolderId: record.userId
//   });
//   const update = {
//     eventName: this.props.singleEvent.eventName,
//     description: this.props.singleEvent.description,
//     eventId: this.props.singleEvent.id,
//     userId: this.props.userId,
//     image: this.props.singleEvent.image,
//     endDate: this.props.singleEvent.endDate,
//     // record: record.time,
//     // recordHolderName: record.userName,
//     // recordHolderId: record.userId
//   }
//   // console.log("UPDATE", this.state)
//   // this.props.updateSingleEvent()
//   // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
//   // this.props.updateSingleEvent(update)
// }


render () {
  const myId = this.props.userId
  const eventId = this.props.match.params.eventId
  const registered = this.props.registeredEvents.filter(event => event.eventId == eventId)
  const registeredId = registered.filter(event => event.userId == myId)
  const record= this.props.allRecords.filter(record=> record.eventId == eventId)
  const myResults = this.props.allResults.filter(result => result.eventId == eventId)
  const sorted = myResults.sort((a, b) => (parseInt(a.time) - parseInt(b.time)))
  const tempRecord = sorted[0]
  const myRecord = record[0]
  const users = this.props.allUsers



  return (
    <div>
    <div>
    <div className ="card grid text-center" style={{width: "18rem"}}  >
    <img src={this.props.singleEvent.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{this.props.singleEvent.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {this.props.singleEvent.type}</h5>
    <p className="card-text">{this.props.singleEvent.description}</p>
    <h5 className="card-subtitle mb-2 text-muted">End Date: {this.props.singleEvent.endDate}</h5>
   {registeredId.length ? <div>Already Registered </div> : <Link className="btn btn-primary" onClick={this.handleSubmit} to='/profile' >Register</Link>}
   <p></p>
   <h5>{this.props.singleEvent.createdBy == myId ?  <Link className="btn btn-primary"  to={`/eventsedit/${this.props.singleEvent.createdBy}`}>Edit Event</Link> : <div></div>}</h5>
  </div>
</div>
<div>
<h2>Registered Users</h2>
<div className ="card" style={{width: "18rem"}}>
<div className="card-body">
{registered.map((event) => {
     return (
 <h6 className="card-text" key={event.id}>Name: {event.user ? event.user.username : "No Users" }</h6>
 )})}
 </div>
 </div>
<h2>Results</h2>
{sorted.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title"><Link to={`/users/${event.userId}`} >User Name: {event.userName}</Link></h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {event.eventId}</h6>
 <h6 className="card-text">Time: {event.time}</h6>
 </div>
 </div>
)})}
<h2>Current Record</h2>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">RecordHolder: {tempRecord? tempRecord.userName : "N/A" }</h5>
<h5 className="card-title">Record: {tempRecord ? tempRecord.time : "N/A" }</h5>
<h5>{this.props.singleEvent.record ? <Link className="btn btn-primary" onClick={() => this.props.updateSingleRecord(tempRecord, this.props.singleEvent.record.id)} to='/records'> Update All Time Record</Link>: <button className="btn btn-primary" onClick={() => this.props.createRecord(tempRecord)} > Create Record</button>}</h5>
</div>
</div>
</div>
<h2>All Time Record</h2>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">RecordHolder: {myRecord ? myRecord.userName : "No Record Yet" }</h5>
<h5 className="card-title">Record: {myRecord ? myRecord.time : "No Record Yet" }</h5>
</div>
</div>
</div>
</div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  allUsers: state.allUsers,
  allResults: state.allResults,
  allRecords: state.allRecords,
  registeredEvents: state.registeredEvents
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history)),
    fetchResults: () => dispatch(fetchResults()),
    fetchUsers: () => dispatch(fetchUsers()),
    createRecord: (event) => dispatch(createRecord(event, history)),
    fetchRecords: (id) => {dispatch(fetchRecords(id))},
    updateSingleRecord: (event, id, history) => dispatch(updateSingleRecord(event, id, history)),
    fetchRegisteredEvents: () => {dispatch(fetchRegisteredEvents())},
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
