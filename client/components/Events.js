import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchEvents } from '../store/allEventsStore'
import { deleteEvent } from '../store/allEventsStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'
import { fetchRegisteredEvents } from '../store/allRegisteredEventsStore';


export class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      eventTypes: ""
    };
    this.handleChange = this.handleChange.bind(this)
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

handleChange(event) {

  this.setState({
    [event.target.name]:event.target.value,
  })
};

render () {
const today = new Date();
const  todayDate = today.toISOString().substring(0, 10);
// console.log("TODAY", todayDate)
  // const todayDate = new Date().toLocaleString() + ''
  // let date1 = new Date(todayDate)
  // console.log("TODAY", today)
  // let date2 = "2023-01-10"
  //     console.log("1 > 2", "2023-01-12" > "2023-01-10")
      // console.log("1 < 2", date1 - date2)
      // let dif= Math.abs(date1 - date2);
      // console.log("DIF", dif)
  // let days = Math.floor(dif/(1000*3600*24))
  // console.log("DAYS", days)
  const myId = this.props.userId
  const allEvents = this.props.allEvents
  allEvents.sort(function (x, y) {
    let a = new Date(x.endDate),
        b = new Date(y.endDate);
    return a - b;
});
  // console.log("all", allEvents)

  // console.log("ACT", active)


  const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId)
  // const active



  const eventsAvailable  = allEvents.filter(function(event){
    return myRegisteredEvents.filter(function(reg){
       return reg.eventId == event.id;
    }).length == 0
 });

 const eventTypes=eventsAvailable.map(({ type }) => type)
 let unique = eventTypes.filter((item, i, ar) => ar.indexOf(item) === i)
//  console.log("EVENTYPES", eventTypes)
 const eventTypeSelected = this.state.eventTypes

 const active = eventsAvailable.filter(event=> event.endDate >= todayDate)
 const past = eventsAvailable.filter(event=> event.endDate < todayDate)




  return (
    <div style={{marginTop:"200px"}}>
       <div>
        <select onChange={this.handleChange} name="eventTypes" className='custom-select'>
              <option value="">Filter by Event Type</option>
              {unique.map((event) => <option key={event} value={event}>{event}</option>)}
            </select>
          </div>
    <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: "20px"}}><u>Active Events</u></h2>
    {/* <div className="container text-center"> */}
      <div className='row'>
       {eventTypeSelected.length ? active.filter(event=> event.type == eventTypeSelected).map((event) => {
        return (
          <div className='col' key={event.id} >
    <div className ="card border-primary mb-3 border-5 " style={{width: "18rem"}} >
    <img src={event.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    </div>
    <h5 className="list-group-item">Type: {event.type}</h5>
    <h5 className="list-group-item">End Date: {event.endDate}</h5>
    <p className="card-text">{event.description}</p>
    <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
   <h5>{event.createdBy == myId ?  <Link className="btn btn-primary"  to={`/eventsedit/${event.id}`}>Edit Event</Link> : <div></div>}</h5>
   <h5>{event.createdBy == myId ?  <button className="btn btn-primary"  onClick={() => this.props.deleteEvent(event.id)} >Delete Event</button> : <div></div>}</h5>
    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
</div>
</div>
)}) : active.map((event) => {
  return (
    <div className='col zoom' key={event.id} >
      <div className="container text-center mt-2">
      <div className="border border-primary rounded-circle border-5 text-center" style={{width:"18rem", backgroundColor:"white", marginLeft:'15px', marginBottom:"15px", marginTop: "15px"}}>
      <Link to={`/events/${event.id}`}>
<img src={event.image} className="card-img-top rounded-circle" style={{width:"75%", marginTop: "5%", marginBottom: "10%", marginLeft:"auto", marginRight: "auto"}} />
<div className="card-body">
<h2 className="card-title">{event.eventName}</h2>
<div className="list-group-item">Type: {event.type}</div>
<div className="list-group-item">End Date: {event.endDate}</div>
<div className="card-text">{event.description}</div>
<h5>{event.createdBy == myId ?  <Link className="btn btn-primary"  to={`/eventsedit/${event.id}`}>Edit Event</Link> : <div></div>}</h5>
<h5>{event.createdBy == myId ?  <button className="btn btn-primary"  onClick={() => this.props.deleteEvent(event.id)} >Delete Event</button> : <div></div>}</h5>
{/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
</div>
</Link>
</div>
</div>
</div>
)})}
{/* </div> */}
</div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}><u>Past Events</u></h2>
    <div className="container text-center">
      <div className='row'>
      {eventTypeSelected.length ? past.filter(event=> event.type == eventTypeSelected).map((event) => {
        return (
          <div className='col' key={event.id} >
    <div className ="card border-dark mb-3" style={{width: "18rem"}} >
    <img src={event.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h5 className="card-text">Type: {event.type}</h5>
    <h5 className="card-text">End Date: {event.endDate}</h5>
    <p className="card-text">{event.description}</p>
    <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
    <h1></h1>
    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
  </div>
</div>
</div>
)}) : past.map((event) => {
  return (
    <div className='col zoom' key={event.id} >
      <div className="border border-primary rounded-circle border-5 " style={{backgroundColor:"white", marginLeft:'15px', marginBottom:"15px", marginTop: "15px", width:"18rem"}}>
      <Link to={`/events/${event.id}`}>
<img src={event.image} className="card-img-top rounded-circle" style={{width:"75%", marginTop: "5%", marginBottom: "10%", marginLeft:"auto", marginRight: "auto"}}/>
<div className="card-body">
<h5 className="card-title">{event.eventName}</h5>
<h5 className="list-group-item">Type: {event.type}</h5>
<h5 className="list-group-item">End Date: {event.endDate}</h5>
<p className="card-text">{event.description}</p>
<h1></h1>
{/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
</div>
</Link>
</div>
</div>
)})}
</div>
</div>
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"15px", marginBotton:"150px"}} >
<Link className="btn btn-primary" to={`/events/create`}>Create Event</Link>
</div>
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
    deleteEvent: (id) => (dispatch(deleteEvent(id, history)))
  };
};

export default connect(mapState, mapDispatch)(Events)
