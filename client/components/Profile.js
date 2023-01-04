import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'


export class Profile extends React.Component {
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
      this.props.fetchSingleUser(this.props.userId)
    }

    handleSubmit(event){
      // event.preventDefault();
      console.log("HO!!!", event)
      // this.setState
    }

    render () {
      const myId = this.props.userId
      const myRegisteredEvents = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId)


  return (

    <div>
      <h1>{this.props.singleUser.username}</h1>
    {myRegisteredEvents.map((event) => {
     return (
 <div className ="card" style={{width: "18rem"}} key={event.id} >
<div className="card-body">
 <h5 className="card-title">{event.eventName}</h5>
 <h6 className="card-subtitle mb-2 text-muted">{event.description}</h6>
 <h6 className="card-text">{event.completed ? <p>DONE</p> :<p>NOT DONE </p>}</h6>
 {/* <Link className="card-link" to={`/events/${event.id}`}>Event Detail</Link> */}
 <Link className="card-link" to={`/results/add/${event.eventId}`}>Add Result</Link>
 <h1></h1>
 <button className="btn btn-primary" onClick={this.handleSubmit(event)}>Done</button>
</div>
</div>)})}
</div>
)
}}

const mapState = (state) => {
  return{
    registeredEvents: state.registeredEvents,
    userId: state.auth.id,
    singleUser: state.singleUser
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchRegisteredEvents: () => dispatch(fetchRegisteredEvents()),
    fetchSingleUser: (id) => {dispatch(fetchSingleUser(id))},
    updateSingleRegisteredEvent: (event) => (dispatch(updateSingleRegisteredEvent((event, history))))
  };
};

export default connect(mapState, mapDispatch)(Profile)
