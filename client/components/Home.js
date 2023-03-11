import React from 'react'
import {connect} from 'react-redux'
import { fetchResults } from '../store/allResultsStore'
import { fetchEvents } from '../store/allEventsStore'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
    // this.handleChange = this.handleChange.bind(this)
    // // this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount(){
  this.props.fetchEvents()
  this.props.fetchResults()
}
render () {
  const allEvents = this.props.allEvents
  allEvents.sort(function (x, y) {
    let a = new Date(x.startDate),
        b = new Date(y.startDate);
    return a - b;
});
const today = new Date();
const  todayDate = today.toISOString().substring(0, 10);
const newestEvents = allEvents.splice(0,3)

const allResults = this.props.allResults
allEvents.sort(function (x, y) {
  let a = new Date(x.updatedAt),
      b = new Date(y.updatedAt);
  return a - b;
});

const newestResults = allResults.splice(0,3)

  return (
    <div style={{marginTop:"200px"}}>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: "20px"}}><u>Newest Events</u></h2>
      <div className='row'>
     {newestEvents.map((event) => {
  return (
    <div className='col' key={event.id} >
      <div className="container text-center mt-2">
<div className ="border border-primary rounded-circle border-5 text-center" style={{width:"18rem", backgroundColor:"white", marginLeft:'15px', marginBottom:"15px", marginTop: "15px"}}>
<img src={event.image} className="card-img-top rounded-circle" style={{width:"75%", marginTop: "5%", marginBottom: "10%", marginLeft:"auto", marginRight: "auto"}} />
<div className="card-body">
<h5 className="card-title">{event.eventName}</h5>
<h5 className="card-subtitle mb-2 text-muted">Type: {event.type}</h5>
<h5 className="card-subtitle mb-2 text-muted">End Date: {event.endDate}</h5>
<p className="card-text">{event.description}</p>
<h6> {event.endDate}</h6>
<h6 className="card-text">{event.endDate >=  todayDate ? <p>Active</p> :<p>NOT DONE </p>}</h6>
<Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link>
<h1></h1>
</div>
</div>
</div>
</div>
)})}
</div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: "20px"}}><u>Newest Results</u></h2>
      <div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
      UserName
    </div>
    <div className="col">
      UserId
    </div>
    <div className="col">
      EventId
    </div>
    <div className="col">
     Event Name
    </div>
    <div className="col">
      Time
    </div>
    </div>
    </div>
    {newestResults.map((result) => {
        return (<div className="container text-center"key={result.id}>
          <div className="row align-items-start">
          <div className="col" ><Link to={`/users/${result.userId}`}>{result.userName}</Link>
    </div>
        <div className="col" ><Link to={`/users/${result.userId}`}>{result.userId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventName}</Link>
    </div>
    <div className="col">
       {result.time}
    </div>
    </div>
    </div>)})}
    </div>
  )
  }}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    allEvents: state.allEvents,
    allResults: state.allResults
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
    fetchEvents: () => dispatch(fetchEvents()),

  };
};

export default connect(mapState, mapDispatch)(Home)
