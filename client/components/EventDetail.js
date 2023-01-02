import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { updateSingleEvent } from '../store/singleEventStore'

export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(props){
  this.props.fetchEvent(this.props.match.params.eventId)
}
render () {
  console.log("STATE", this.props)
  return (
    <div className ="card" style={{width: "18rem"}}  >
  <div className="card-body">
    <h5 className="card-title">{this.props.singleEvent.eventName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{this.props.singleEvent.description}</p>
    <Link className="card-link" to={`/results/add/${this.props.singleEvent.id}`}>Add Result</Link>
  </div>
</div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent
})

const mapDispatchToProps = (dispatch) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
