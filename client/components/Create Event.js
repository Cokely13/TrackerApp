import React from 'react'
import { connect } from "react-redux";
import { createEvent } from '../store/allEventsStore';
import { Link } from 'react-router-dom'


export class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      description: "",
      endDate: "",
      startDate: "",
      type: "Type",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createEvent({ ...this.state});
  }

    render() {
      const {description, eventName} = this.state
  return (
    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
        <div className="col">
        <label>Event Name</label>
          <input name='eventName' onChange={this.handleChange}  type="text" className='form-control' placeholder='Name'/>
        </div>
        <div className="col">
          <label>Description</label>
          <input name="description" onChange={this.handleChange}  type="text" className='form-control' placeholder='description' />
        </div>
        <div className="col">
         <label>Type</label>
          <select  onChange={this.handleChange} placeholder='Type' className="custom-select my-1 mr-sm-2">
        <option disabled>Type</option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Row">Row</option>
          <option value="Random">Random</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-secondary">Add Event</button>
    </form>
  </div>
  )
}
}




const mapDispatch = (dispatch, { history }) => {
  return {

    createEvent: (event) => dispatch(createEvent(event, history))
  };
};

export default connect(null, mapDispatch)(CreateEvent);
