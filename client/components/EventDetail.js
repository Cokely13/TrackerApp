import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { updateSingleEvent } from '../store/singleEventStore'
import {createRegisteredEvent} from '../store/allRegisteredEventsStore'


export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
    };

     this.handleSubmit = this.handleSubmit.bind(this);
}


componentDidMount(props){
  this.props.fetchEvent(this.props.match.params.eventId)
  // console.log("check", this.props)
}

handleSubmit(event) {
  event.preventDefault();
  const newReg = {
    eventName: this.props.singleEvent.eventName,
    description: this.props.singleEvent.description,
    eventId: this.props.singleEvent.id,
    userId: this.props.userId
  }
  this.props.createRegisteredEvent(newReg)
}


render () {
  console.log("STATE", this.props)
  return (
    <div className ="card" style={{width: "18rem"}}  >
  <div className="card-body">
    <h5 className="card-title">{this.props.singleEvent.eventName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{this.props.singleEvent.description}</p>
    <Link className="btn btn-primary" onClick={this.handleSubmit} to='/profile' >Register</Link>
    {/* <Link className="card-link" to={`/results/add/${this.props.singleEvent.id}`}>Add Result</Link> */}
  </div>
</div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
