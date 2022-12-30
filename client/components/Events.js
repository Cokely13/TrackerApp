import React from 'react'
import { connect } from 'react-redux'
import { fetchEvents } from '../store/allEventsStore'


export class Events extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(){
  this.props.fetchEvents()
}


render () {

console.log("EVENTS", this.props.allEvents)
  return (
    <div>
       {this.props.allEvents.map((event) => {
        return (
    <div className ="card" style={{width: "18rem"}} key={event.id} >
  <div className="card-body">
    <h5 className="card-title">{event.eventName}</h5>
    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p className="card-text">{event.description}</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div>
</div>)})}
</div>
)
}}

const mapState = (state) => {
  return{
    allEvents: state.allEvents
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  };
};

export default connect(mapState, mapDispatch)(Events)
