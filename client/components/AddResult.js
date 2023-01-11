import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore';
import { createResult } from '../store/allResultsStore'
import { fetchSingleUser } from '../store/singleUserStore';
import {fetchSingleRegisteredEvent, updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
import { createRecord } from '../store/allRecordsStore';


export class AddResult extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      time: "",
      eventId: "",
      userId: "",
      userName: ""

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(props){
    this.props.fetchSingleUser(this.props.userId)
    this.props.fetchRegisteredEvents()
    this.props.fetchEvent(this.props.match.params.eventId)
    this.setState({
      // eventName: this.props.singleEvent.eventName,
      eventId: this.props.match.params.eventId,
      userId: this.props.userId
    })
  }

  handleChange(event) {
    this.setState({
      eventName:this.props.singleEvent.eventName,
      userName:this.props.singleUser.username,
      [event.target.name]: event.target.value,
    // register: {
    //   id: this.myRegisteredEvent.id,
    // }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createResult({ ...this.state});
    // updateSingleRegisteredEvent(this.state.register)
  }

    render() {
      const myId = this.props.userId
      const eventId = this.props.match.params.eventId
      // console.log("state", this.state)
      // console.log("registered", this.props.registeredEvents)
      const myRegisteredEvent = this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId && registeredEvent.eventName === this.props.singleEvent.eventName)
      // const regId = myRegisteredEvent[0]
      // console.log("Myregistered", myRegisteredEvent)
      // const myEvent = myRegisteredEvents.filter(myRegisteredEvent => myRegisteredEvent.eventId === "7")
      // console.log("EVENT", myEvent)
      // console.log("IDDDD", regId)
  return (


    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
        <input className="form-control" type="text" placeholder={this.props.singleEvent.eventName} aria-label="Disabled input example" disabled />
        </div>
        <div className="col">
          <label>Description</label>
          <input className="form-control" type="text" placeholder={this.props.singleEvent.description} aria-label="Disabled input example" disabled />
          </div>
        <div className="col">
        <label>Time</label>
          <input name='time' onChange={this.handleChange}  type="text" className='form-control' placeholder='Enter Result'/>
        </div>
      <button type="submit" className="btn btn-secondary">Add Result</button>
      </div>
    </form>
  </div>
  )
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  singleUser: state.singleUser,
  registeredEvents: state.registeredEvents,
  singleRegisteredEvent: state.singleRegisteredEvent
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    fetchSingleUser: (id) => {dispatch(fetchSingleUser(id))},
    // updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    updateSingleRegisteredEvent: (event, history) => dispatch(updateSingleRegisteredEvent(event, history)),
    createResult: (result)=> dispatch(createResult(result, history)),
    fetchSingleRegisteredEvent: (id) => dispatch(fetchSingleRegisteredEvent(id)),
    fetchRegisteredEvents :  () => dispatch(fetchRegisteredEvents()),
    createRecord : (event) => dispatch(createRecord(event, history))
  }

  }



export default connect(mapStateToProps, mapDispatchToProps)(AddResult)
