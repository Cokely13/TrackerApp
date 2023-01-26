import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { fetchResults, deleteResult } from '../store/allResultsStore';
import { fetchRecords } from '../store/allRecordsStore';
import { fetchUsers } from '../store/allUsersStore';
import { createChallenge } from '../store/allChallengesStore';
import {Image} from 'react-bootstrap'
// import RegisterUpdate from './RegisterUpdate';
// import { fetchUsers } from '../store/allUsersStore';

export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      reset: true,
      eventTypes: "",
      challengeOn: "",
      challenge: {
        eventName: "",
        eventId: "",
        endDate: "",
        challenger: "",
        type: "",
        challenged: ""
      }

    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

    componentDidMount(){
      this.props.fetchUsers()
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

      handleChange2(event, registered) {
        this.setState({
          challenge: {
            challenge: {
              eventName: registered.eventName,
              eventId: registered.id,
              endDate: registered.endDate,
              challenger: this.props.userId,
              type: registered.type,
              challenged:event.target.value,
            }
          }
        })
      };

      handleClick2(event, registered) {
        console.log("EVENT", registered)
        this.setState({
          challengeOn: registered.id,
        })
        // this.props.createChallenge(event)
       }

       handleSubmit(event) {
        event.preventDefault()
        // const newChallenge = this.state.challenge
        console.log("newChallenge", this.state.challenge.challenge)
       this.props.createChallenge(this.state.challenge.challenge)
      };



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
      const users = this.props.allUsers.filter(user => user.id !== myId)
      const userNames=users.map(({ username }) => username)
      // const myRecords = filteredRecords[0]

      // console.log("my records", myRegisteredEvents)
      // console.log("my records", sorted)

      const eventTypes=myRegisteredEvents.map(({ type }) => type)
      let unique = eventTypes.filter((item, i, ar) => ar.indexOf(item) === i)
      const eventTypeSelected = this.state.eventTypes
      console.log("StATE", this.state)

  return (

    <div>
      <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>{this.props.singleUser.username}</h1>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
      <Image roundedCircle id="userProfileImage"  style={{width: "18rem"}} src={this.props.singleUser.imageUrl}/>
      </div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>Birthday: {this.props.singleUser.birthday}</h1>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>Gender:{this.props.singleUser.gender}</h1>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}># of Records:{myRecords.length}  </h1>
      <hr></hr>
      <div>
        <select onChange={this.handleChange} name="eventTypes" className='custom-select'>
              <option value="">Filter by Event Type</option>
              {unique.map((event) => <option key={event} value={event}>{event}</option>)}
            </select>
          </div>
          </div>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}> Active Events: </h2>
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
 <h1></h1>
 <button onClick={event => this.handleClick2(event, registered)}>Challenge Friend</button>
  {this.state.challengeOn == registered.id ? <div>
  <hr></hr>
      <div>
        <select onChange={event => this.handleChange2(event, registered)} name="challenged" className='custom-select'>
              <option value="">Pick Friend</option>
              {userNames.map((event) => <option key={event} value={event}>{event}</option>)}
            </select>
          </div>
          <div>
 <button onClick={this.handleSubmit} className="btn btn-secondary">CHALLENGE!</button>
 </div> </div>
  : <div> </div>}
</div>
</div>
</div>)})}
</div>
 <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>Results: </h2>{myResults.length ? <div>
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
)})}</div>: <div className ="container text-center"><h5>No Results Yet. Step it up Pal!</h5></div>}
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}> Completed Events:</h2>
      <div className ="row container text-center "  >
    {myCompletedEvents.length ?myCompletedEvents.map((registered) => {
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
</div>)}):
   <h5>No Completed Events Yet. Step it up Pal!</h5>
  }
</div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}> Your Records:</h2>
{myRecords.length ? <div className="container text-center">
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
    <div>
    {myRecords.map((record) => {
     return (
 <div className ="container text-center" key={record.id} >
<div className="row align-items-start">
 <h5 className="col">{record.eventName}</h5>
 <h6 className="col">{record.eventId}</h6>
 <h6 className="col">{record.time}</h6>
 <Link className="col" to={`/events/${record.eventId}`}>Event Detail</Link>
</div>
</div> )})}</div></div> : <div className ="container text-center"><h5>No Records Yet. Step it up Pal!</h5></div>}
</div>
)
}}

const mapState = (state) => {
  return{
    registeredEvents: state.registeredEvents,
    userId: state.auth.id,
    singleUser: state.singleUser,
    allResults: state.allResults,
    allRecords: state.allRecords,
    allUsers: state.allUsers
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents()),
    fetchSingleUser: (id) => {dispatch(fetchSingleUser(id))},
    updateSingleRegisteredEvent: (id) => (dispatch(updateSingleRegisteredEvent((id)))),
    fetchResults: () => dispatch(fetchResults()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchRecords: () => dispatch(fetchRecords()),
    createChallenge: (event) => dispatch(createChallenge(event, history)),
    deleteResult: (id) => dispatch(deleteResult(id, history))
  };
};

export default connect(mapState, mapDispatch)(Profile)
