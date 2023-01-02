import React from 'react'
import { connect } from "react-redux";
import { createEvent } from '../store/allEventsStore';
import { Link } from 'react-router-dom'


export class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      description: ""
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
          <input name="description" onChange={this.handleChange}  type="text" className='form-control' placeholder='Location' />
        </div>
        <div className="col">
        <select value={"Price Range"} onChange={(event => console.log(event.target.value))}  placeholder='Location' className="custom-select my-1 mr-sm-2">
        <option disabled>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
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
