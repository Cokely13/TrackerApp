import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore';
import { createResult } from '../store/allResultsStore'
import { fetchUser } from '../store/singleUserStore';

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
    this.props.fetchUser(this.props.userId)
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
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createResult({ ...this.state});
  }

    render() {
  return (


    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
        <input className="form-control" type="text" placeholder={this.props.singleEvent.eventName} aria-label="Disabled input example" disabled />
        </div>
        <div className="col">
        <label>Time</label>
          <input name='time' onChange={this.handleChange}  type="text" className='form-control' placeholder='Enter Result'/>
        </div>
        <div className="col">
          <label>Description</label>
          <input className="form-control" type="text" placeholder={this.props.singleEvent.description} aria-label="Disabled input example" disabled />
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
      <button type="submit" className="btn btn-secondary">Add Result</button>
      </div>
    </form>
  </div>
  )
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  singleUser: state.singleUser
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    fetchUser: (id) => {dispatch(fetchUser(id))},
    updateSingleEvent: (event, history) => dispatch(updateSingleEvent(event, history)),
    createResult: (result)=> dispatch(createResult(result, history))
  }
  }


export default connect(mapStateToProps, mapDispatchToProps)(AddResult)
