import React from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {fetchEvent, updateSingleEvent} from '../store/singleEventStore'
import { fetchResult, updateSingleResult} from '../store/singleResultsStore'
// import { createResult } from '../store/allResultsStore'
// import { fetchSingleUser } from '../store/singleUserStore';
// import {fetchSingleRegisteredEvent, updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
// import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
// import { createRecord } from '../store/allRecordsStore';


export class EditEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      eventName: "",
      description: "",
      endDate: "",
      createdBy: "",
      type: "",
      image: ""

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.props.fetchEvent(this.props.match.params.eventId)
    // this.setState({
    //   id: this.props.singleResult.id,
    //   eventName: this.props.singleResult.eventName,
    //   time: this.props.singleResult.time,
    //   userName: this.props.singleResult.userName,
    //   userId: this.props.singleResult.userId,
    //   eventId: this.props.singleResult.eventId,
    // })
  }



  handleChange(event) {
    // console.log("id", this.props.singleResult.id,)
    // console.log("prop", this.props.singleResult,)
    this.setState({
      id: this.props.singleEvent.id,
      eventName: this.props.singleEvent.eventName,
      description: this.props.singleEvent.description,
      endDate: this.props.singleEvent.endDate,
      createdBy: this.props.singleEvent.createdBy,
      type: this.props.singleEvent.type,
      image: this.props.singleEvent.image
    })

    console.log("STATEEE", this.state)
    };


  handleSubmit(event) {
    console.log("STATE", this.state)
    event.preventDefault();
    this.props.updateSingleEvent({ ...this.state});
    this.props.history.push('/events')
    // updateSingleRegisteredEvent(this.state.register)
  }

    render() {
      const myEvent =this.props.singleEvent
      console.log("STATE", this.state)
  return (


    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
          <input name='eventName' onChange={this.handleChange}  type="text" className='form-control' placeholder={myEvent.eventName} />
        </div>
        <div className="col">
        <label>Description</label>
          <input name='description' onChange={this.handleChange}  type="text" className='form-control' placeholder={myEvent.description} />
        </div>
        <div className="col">
        <label>End Date</label>
          <input name='endDate' onChange={this.handleChange}  type="text" className='form-control' placeholder={myEvent.endDate} />
        </div>
        <div className="col">
        <label>Type</label>
          <input name='type' onChange={this.handleChange}  type="text" className='form-control' placeholder={myEvent.type} />
        </div>
      <button type="submit" className="btn btn-secondary">Update Result</button>
      </div>
    </form>
  </div>
  )
}}



const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,

})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    fetchEvent: (id) => dispatch(fetchEvent(id))
  }

  }



export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
