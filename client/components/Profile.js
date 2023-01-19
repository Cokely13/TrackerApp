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
      reset: true,
      eventTypes: ""

    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this)
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

      handleChange(event) {
        this.setState({
          [event.target.name]:event.target.value,
        })
      };

      // handleSubmit(id) {
      //   this.props.deleteResult(id)
      //  }



    render () {
      const today = new Date();
      const  todayDate = today.toISOString().substring(0, 10);
      const myId = this.props.userId
      const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == false)
      myRegisteredEvents.sort(function (x, y) {
        let a = new Date(x.endDate),
            b = new Date(y.endDate);
        return a - b;
    });

      const myCompletedEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.completed == true)
      const myResults = this.props.allResults.filter(result => result.userId === myId)
      const myRecords = this.props.allRecords.filter(record => record.userId == myId)
      // const myRecords = filteredRecords[0]

      console.log("my records", myRegisteredEvents)
      // console.log("my records", sorted)

      const eventTypes=myRegisteredEvents.map(({ type }) => type)
      let unique = eventTypes.filter((item, i, ar) => ar.indexOf(item) === i)
      const eventTypeSelected = this.state.eventTypes

  return (

    <div>
      <h1>{this.props.singleUser.username}</h1>
      <Image roundedCircle id="userProfileImage"  style={{width: "18rem"}} src={this.props.singleUser.imageUrl}/>
      <h1>Birthday: {this.props.singleUser.birthday}</h1>
      <h1>Gender:{this.props.singleUser.gender}</h1>
      <h1># of Records:{myRecords.length}  </h1>
      <div>
        <select onChange={this.handleChange} name="eventTypes" className='custom-select'>
              <option value="">Filter by Event Type</option>
              {unique.map((event) => <option key={event} value={event}>{event}</option>)}
            </select>
          </div>
      <h2> Active EVENTS</h2>
      {/* gy-5 */}
      <div className ="row container text-center "  >
    {eventTypeSelected.length ? myRegisteredEvents.filter(event=> event.type == eventTypeSelected).map((registered) => {
     return (
      <div className="col" key={registered.id}>
 <div className ="card border-primary mb-3" style={{width: "18rem"}} key={registered.id} >
  <img src={registered.image} className="card-img-top" />
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.eventId}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Date: {registered.endDate}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
 <Link className="card-link" to={`/events/${registered.eventId}`}>Event Detail</Link>
 <h6 className="card-text">{ registered.endDate >= todayDate ? <p>Active</p> :<p></p>}</h6>
 <h6> {registered.endDate >= todayDate ?  <Link className="card-link" to={`/results/add/${registered.eventId}`}>Add Result</Link>:<p>Past </p>}</h6>
 <h1></h1>
 <button onClick={event => this.handleClick(event, registered)}>Complete Event</button>
</div>
</div>
</div>)}) :  myRegisteredEvents.map((registered) => {
     return (
      <div className="col" key={registered.id}>
 <div className ="card border-primary mb-3" style={{width: "18rem"}} key={registered.id} >
  <img src={registered.image} className="card-img-top" />
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.eventId}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Date: {registered.endDate}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
 <Link className="card-link" to={`/events/${registered.eventId}`}>Event Detail</Link>
 <h6 className="card-text">{ registered.endDate >= todayDate ? <p>Active</p> :<p></p>}</h6>
 <h6> {registered.endDate >= todayDate ?  <Link className="card-link" to={`/results/add/${registered.eventId}`}>Add Result</Link>:<p>Past </p>}</h6>
 <h1></h1>
 <button onClick={event => this.handleClick(event, registered)}>Complete Event</button>
</div>
</div>
</div>)})}
</div>
<h2>Results</h2>
<div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
      EventId
    </div>
    <div className="col">
     Event Name
    </div>
    <div className="col">
      Time
    </div>
    <div className="col">
      Event Detail
    </div>
    <div className="col">
      Edit Result
    </div>
    <div className="col">
      Delete Result
    </div>
    </div>
    </div>
{myResults.map((event) => {
     return (
 <div className ="container text-center" key={event.id} >
<div className="row align-items-start">
 <h5 className="col">{event.eventId}</h5>
 <h6 className="col">{event.eventName}</h6>
 <h6 className="col">{event.time}</h6>
 <Link className="col" to={`/events/${event.eventId}`}>Event Detail</Link>
 <Link className="col" to={`/results/${event.id}`}>Edit Result</Link>

 <button type="button" className="btn btn-danger" style={{width: "10rem"}}onClick={() => this.props.deleteResult(event.id)}>Delete Result</button>
 <p></p>
<p></p>
 </div>
 </div>
)})}
      <h2> Completed EVENTS</h2>
      <div className ="row container text-center "  >
    {myCompletedEvents.map((registered) => {
     return (
      <div className="col" key={registered.id} >
 <div className ="card" style={{width: "18rem"}} key={registered.id} >
<div className="card-body">
 <h5 className="card-title">Event Name:{registered.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">Event Id: {registered.id}</h6>
 <h6 className="card-subtitle mb-2 text-muted">Event Description:{registered.description}</h6>
 <Link className="card-link" to={`/events/${registered.id}`}>Event Detail</Link>
</div>
</div>
</div>)})}
</div>
<h2> Your Records</h2>
<div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
    Event Name
    </div>
    <div className="col">
     Event Id
    </div>
    <div className="col">
      Time
    </div>
    <div className="col">
      Event Detail
    </div>
    </div>
    </div>
  {myRecords.length ? myRecords.map((record) => {
     return (
 <div className ="container text-center" key={record.id} >
<div className="row align-items-start">
 <h5 className="col">{record.eventName}</h5>
 <h6 className="col">{record.eventId}</h6>
 <h6 className="col">{record.time}</h6>
 <Link className="col" to={`/events/${record.eventId}`}>Event Detail</Link>
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
