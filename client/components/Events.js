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
  // console.log("all", allEvents)

  // console.log("ACT", active)


  const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId)
  // const active

  const eventsAvailable  = allEvents.filter(function(event){
    return myRegisteredEvents.filter(function(reg){
       return reg.eventId == event.id;
    }).length == 0
 });

 const active = eventsAvailable.filter(event=> event.endDate >= todayDate)
 const past = eventsAvailable.filter(event=> event.endDate < todayDate)

//  const sorted = eventsAvailable.sort((a, b) => {
//   return b.endDate - a.endDate;
// });

  //  const images = {
  //         Bike: "https://c.ndtvimg.com/2020-08/dtm9edd8_cycling_625x300_05_August_20.jpg?ver-20221221.02",
  //         Row: "https://www.byrdie.com/thmb/wt0s4-TZV_nQt3NXswXUYHil48Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TheseOnlineRowingClassesWillHelpYouGetTonedinNoTime-a2959753b88f4ebb8ac9532971123761.jpg",
  //         Run: 'https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg',
  //         Swim: "https://www.shape.com/thmb/y7XHTgiQzL_gLqtB7AVR1LBYZHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/swimming-workouts-for-women-d137e32a8fcf4d68bf4713ce2c628a07.jpg",
  //         Random: "https://res.cloudinary.com/upskilled/image/fetch/w_600,h_400,c_crop,c_fill,g_face:auto,f_auto/https://www.upskilled.edu.au/getmedia%2Ff4633697-8724-4633-8488-825ec4a1587f%2Fchallenge-yourself-in-your-next-role-HERO.jpg%3B.aspx%3Fwidth%3D1000%26height%3D667%26ext%3D.jpg"
  // };



  return (
    <div>
    <div>Active Events</div>
    <div className="container text-center">
      <div className='row'>
       {active.map((event) => {
        return (
          <div className='col' key={event.id} >
    <div className ="card" style={{width: "18rem"}} >
    <img src={event.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {event.type}</h5>
    <h5 className="card-subtitle mb-2 text-muted">End Date: {event.endDate}</h5>
    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
    <p className="card-text">{event.description}</p>
    <h6> {event.endDate}</h6>
    <h6 className="card-text">{event.endDate >=  todayDate ? <p>Active</p> :<p>NOT DONE </p>}</h6>
    <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
    <h1></h1>
    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
  </div>
</div>
<p></p>
<p></p>
<p></p>
<p></p>
</div>
)})}
</div>
 <Link className="btn btn-primary" to={`/events/create`}>Create Event</Link>
</div>
<div>Past Events</div>
    <div className="container text-center">
      <div className='row'>
       {past.map((event) => {
        return (
          <div className='col' key={event.id} >
    <div className ="card" style={{width: "18rem"}} >
    <img src={event.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {event.type}</h5>
    <h5 className="card-subtitle mb-2 text-muted">End Date: {event.endDate}</h5>
    {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
    <p className="card-text">{event.description}</p>
    <h6> {event.endDate}</h6>
    <h6 className="card-text">{event.endDate >  todayDate ? <p>Active</p> :<p>Past Due </p>}</h6>
    <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
    <h1></h1>
    {/* <button className="btn btn-primary" onClick={this.handleSubmit}>Register</button> */}
  </div>
</div>
<p></p>
<p></p>
<p></p>
<p></p>
</div>
)})}
</div>
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
  };
};

export default connect(mapState, mapDispatch)(Events)
