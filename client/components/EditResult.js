import React from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { fetchResult, updateSingleResult} from '../store/singleResultsStore'
// import { createResult } from '../store/allResultsStore'
// import { fetchSingleUser } from '../store/singleUserStore';
// import {fetchSingleRegisteredEvent, updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
// import {fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
// import { createRecord } from '../store/allRecordsStore';


export class EditResult extends React.Component {
  constructor() {
    super();
    this.state = {
      id: "",
      eventName: "",
      time: "",
      userName: "",
      userId: "",
      eventId: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(props){
    this.props.fetchResult(this.props.match.params.resultId)
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
    console.log("id", this.props.singleResult.id,)
    console.log("prop", this.props.singleResult,)
    this.setState({
      id: this.props.singleResult.id,
      eventName: this.props.singleResult.eventName,
      userName: this.props.singleResult.userName,
      userId: this.props.singleResult.userId,
      eventId: this.props.singleResult.eventId,
      [event.target.name]: event.target.value,
    })

    console.log("STATEEE", this.state)
    };


  handleSubmit(event) {
    console.log("STATE", this.state)
    event.preventDefault();
    this.props.updateSingleResult({ ...this.state});
    this.props.history.push('/profile')
    // updateSingleRegisteredEvent(this.state.register)
  }

    render() {

  return (


    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
        <input className="form-control" type="text" placeholder={this.props.singleResult.eventName} aria-label="Disabled input example" disabled />
        </div>
        <div className="col">
          <label>Event Id</label>
          <input className="form-control" type="text" placeholder={this.props.singleResult.eventId} aria-label="Disabled input example" disabled />
          </div>
        <div className="col">
        <label>Time</label>
          <input name='time' onChange={this.handleChange}  type="text" className='form-control' placeholder={this.props.singleResult.time} />
        </div>
      <button type="submit" className="btn btn-secondary">Update Result</button>
      </div>
    </form>
  </div>
  )
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleResult: state.singleResult

})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    updateSingleResult: (event, history) => dispatch(updateSingleResult(event, history)),
    createResult: (result)=> dispatch(createResult(result, history)),
    fetchResult: (id) => dispatch(fetchResult(id))
  }

  }



export default connect(mapStateToProps, mapDispatchToProps)(EditResult)
