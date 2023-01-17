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
    this.handleChange2 = this.handleChange2.bind(this)
  }

  componentDidMount(){
    this.props.fetchEvent(this.props.match.params.eventId)
    // if (this.props.singleEvent.length) {
    // this.setState({
    //   id: this.props.singleResult.id,
    //   eventName: this.props.singleResult.eventName,
    //   time: this.props.singleResult.time,
    //   userName: this.props.singleResult.userName,
    //   userId: this.props.singleResult.userId,
    //   eventId: this.props.singleResult.eventId,
    // })} else {
    //   console.log("NOPE")
    // }
  }



  handleChange(event) {
    // console.log("id", this.props.singleResult.id,)
    // console.log("prop", this.props.singleResult,)
    this.setState({
      id: this.props.singleEvent.id,
      [event.target.name]: event.target.value,
      createdBy: this.props.singleEvent.createdBy,
      // image: this.props.singleEvent.image
    })

    console.log("STATEEE", this.state)
    };

    handleChange2(event2) {
      const pick = event2.target.value
      console.log("STATE", this.state)
      function Image(prop){
        if (prop === "Swim"){
          return "https://www.shape.com/thmb/y7XHTgiQzL_gLqtB7AVR1LBYZHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/swimming-workouts-for-women-d137e32a8fcf4d68bf4713ce2c628a07.jpg"
        }
        if (prop === "Bike"){
          return "https://c.ndtvimg.com/2020-08/dtm9edd8_cycling_625x300_05_August_20.jpg?ver-20221221.02"
        }
        if (prop === "Row"){
          return "https://www.byrdie.com/thmb/wt0s4-TZV_nQt3NXswXUYHil48Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TheseOnlineRowingClassesWillHelpYouGetTonedinNoTime-a2959753b88f4ebb8ac9532971123761.jpg"
        }
        if (prop === "Random"){
          return "https://res.cloudinary.com/upskilled/image/fetch/w_600,h_400,c_crop,c_fill,g_face:auto,f_auto/https://www.upskilled.edu.au/getmedia%2Ff4633697-8724-4633-8488-825ec4a1587f%2Fchallenge-yourself-in-your-next-role-HERO.jpg%3B.aspx%3Fwidth%3D1000%26height%3D667%26ext%3D.jpg"
        }
        else {
          return 'https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg'
        }
      }
      const newImage = Image(pick)
      console.log("NEW IMAGE", newImage)

      this.setState({
        [event2.target.name]: event2.target.value,
        image: newImage
      });
    }


  handleSubmit(event) {
    console.log("STATE", this.state)
    event.preventDefault();
    this.props.updateSingleEvent({ ...this.state});
    this.props.history.push('/events')
    // updateSingleRegisteredEvent(this.state.register)
  }

    render() {
      const myEvent =this.props.singleEvent
  return (


    <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
          <input name='eventName' onChange={this.handleChange}  type="text" className='form-control' />
        </div>
        <div className="col">
        <label>Description</label>
          <input name='description' onChange={this.handleChange}  type="text" className='form-control'/>
        </div>
        <div className="col">
        <label>End Date</label>
          <input name='endDate' onChange={this.handleChange}  type="text" className='form-control'/>
        </div>
        <div className="col">
        {/* <label>Type</label>
          <input name='type' onChange={this.handleChange}  type="text" className='form-control' placeholder={myEvent.type} /> */}

          <label>Type</label>
          <select  onChange={this.handleChange2} name="type" className="form-control">
          <option disabled selected value="Type">Select Type</option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Row">Row</option>
          <option value="Random">Random</option>
          </select>
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
    updateSingleEvent: (event) => dispatch(updateSingleEvent(event, history)),
    fetchEvent: (id) => dispatch(fetchEvent(id))
  }

  }



export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)
