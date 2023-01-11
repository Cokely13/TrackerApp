import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { updateSingleEvent } from '../store/singleEventStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'
import { fetchResults } from '../store/allResultsStore'
import { createRecord } from '../store/allRecordsStore'
import { fetchRecord } from '../store/singleRecordStore'
import Records from './Records'


export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      record: "",
      recordHolderName: "",
      recordHolderId: ""
    };

     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleSubmit2 = this.handleSubmit2.bind(this);
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
    userId: this.props.userId,
    image: this.props.singleEvent.image,
    endDate: this.props.singleEvent.endDate
  }
  this.props.createRegisteredEvent(newReg)
  // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
  // this.props.updateSingleEvent(update)
}

handleSubmit2(event) {
  event.preventDefault();
  this.setState({
      record: record.time,
      recordHolderName: record.userName,
      recordHolderId: record.userId
  });
  const update = {
    eventName: this.props.singleEvent.eventName,
    description: this.props.singleEvent.description,
    eventId: this.props.singleEvent.id,
    userId: this.props.userId,
    image: this.props.singleEvent.image,
    endDate: this.props.singleEvent.endDate,
    // record: record.time,
    // recordHolderName: record.userName,
    // recordHolderId: record.userId
  }
  console.log("UPDATE", this.state)
  // this.props.updateSingleEvent()
  // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
  // this.props.updateSingleEvent(update)
}


render () {

  const eventId = this.props.match.params.eventId
  const myResults = this.props.allResults.filter(result => result.eventId == eventId)
  const sorted = myResults.sort((a, b) => (parseInt(a.time) - parseInt(b.time)))
      // console.log("UPDATE", sorted)
  const record = sorted[0]
  // console.log("Record", record)
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
    <Link className="btn btn-primary" onClick={this.handleSubmit} to='/profile' >Register</Link>
    {/* <Link className="card-link" to={`/results/add/${this.props.singleEvent.id}`}>Add Result</Link> */}
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
<h2>Record</h2>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">RecordHolder: {record ? record.userName : "N/A" }</h5>
<h5 className="card-title">Record: {record ? record.time : "N/A" }</h5>
<button className="btn btn-primary" onClick={() => this.props.createRecord(record)} > Confirm Record</button>
</div>
</div>
</div>

<h2>All Time Record</h2>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">RecordHolder: {this.props.singleEvent.recordHolderName ? this.props.singleEvent.recordHolderName : "Nothing" }</h5>
<h5 className="card-title">Record: {this.props.singleEvent.record ? this.props.singleEvent.record : "Nothing" }</h5>
</div>
</div>
</div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  allResults: state.allResults,
  singleRecord: state.singleRecord
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history)),
    fetchResults: () => dispatch(fetchResults()),
    createRecord: (event) => dispatch(createRecord(event, history)),
    fetchRecord: (id) => {dispatch(fetchRecord(id))},
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
