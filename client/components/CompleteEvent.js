import React from 'react'
import {fetchSingleRegisteredEvent, updateSingleRegisteredEvent} from '../store/singleRegisteredEventStore'
import { connect } from 'react-redux'

export class CompleteEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      time: "",
      eventId: "",
      userId: "",
      userName: ""

    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


componentDidMount(props){
  this.props.fetchSingleRegisteredEvent(this.props.match.params.eventId)
}

  render() {
    const event = this.props.singleRegisteredEvent
    console.log("TEST", event)
  return (
    <div>
    <div>CompleteEvent</div>
    <div>{event.id}</div>
    </div>
  )
}
}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  ingleRegisteredEvent: state.singleRegisteredEvent
})

const mapDispatchToProps = (dispatch, { history }) => {
  return {
  updateSingleRegisteredEvent: (event, history) => dispatch(updateSingleRegisteredEvent(event, history)),
  fetchSingleRegisteredEvent : (id) => dispatch(fetchSingleRegisteredEvent(id))}
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteEvent)
