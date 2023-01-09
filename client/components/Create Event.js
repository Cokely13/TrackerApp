import React from 'react'
import { connect } from "react-redux";
import { createEvent } from '../store/allEventsStore';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom'


export class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      description: "",
      endDate: "",
      type: "",
      createdBy: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      createdBy: this.props.userId
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("SENDING", this.state)
    this.props.createEvent({ ...this.state});
  }

    render() {
      const current = new Date();
      const todayDate = new Date().toLocaleString() + ''
      console.log("New Date", current)
      console.log("TODAY", todayDate)
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
          <select  onChange={this.handleChange} placeholder='Type' className="form-control">
        <option disabled>Type</option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Row">Row</option>
          <option value="Random">Random</option>
          </select>
        </div>
      </div>
      <div className="col">
          <label>EndDate</label>
          <input name="endDate" onChange={this.handleChange}  type="text" className='form-control'
          placeholder='MM/dd/yyyy'
         />
        </div>
      <button type="submit" className="btn btn-secondary">Add Event</button>
    </form>
  </div>
  )
}
}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
})


const mapDispatch = (dispatch, { history }) => {
  return {

    createEvent: (event) => dispatch(createEvent(event, history))
  };
};

export default connect(mapStateToProps, mapDispatch)(CreateEvent);
