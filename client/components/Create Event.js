import React from 'react'
import { connect } from "react-redux";
import { createEvent } from '../store/allEventsStore';
import { createRecord } from '../store/allRecordsStore';
import DatePicker from 'react-datepicker';
import { DateInput, minValue} from 'react-admin';
import { Link } from 'react-router-dom'


export class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      eventName: "",
      description: "",
      endDate: "",
      type: "",
      createdBy: "",
      image: "https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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


    this.setState({
      [event2.target.name]: event2.target.value,
      image: newImage
    });

    console.log("STATE!!", this.state)

  //   const images = {
  //         Bike: "https://c.ndtvimg.com/2020-08/dtm9edd8_cycling_625x300_05_August_20.jpg?ver-20221221.02",
  //         Row: "https://www.byrdie.com/thmb/wt0s4-TZV_nQt3NXswXUYHil48Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TheseOnlineRowingClassesWillHelpYouGetTonedinNoTime-a2959753b88f4ebb8ac9532971123761.jpg",
  //         Run: 'https://www.news-medical.net/images/Article_Images/ImageForArticle_22980_16600577310868068.jpg',
  //         Swim: "https://www.shape.com/thmb/y7XHTgiQzL_gLqtB7AVR1LBYZHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/swimming-workouts-for-women-d137e32a8fcf4d68bf4713ce2c628a07.jpg",
  //         Random: "https://res.cloudinary.com/upskilled/image/fetch/w_600,h_400,c_crop,c_fill,g_face:auto,f_auto/https://www.upskilled.edu.au/getmedia%2Ff4633697-8724-4633-8488-825ec4a1587f%2Fchallenge-yourself-in-your-next-role-HERO.jpg%3B.aspx%3Fwidth%3D1000%26height%3D667%26ext%3D.jpg"
  // };


  // this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId)
  // const active
  // const newImage = images.filter(images => images == Bike)
  // console.log("IMAGE", typeof(pick))
}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      createdBy: this.props.userId
    });

  }

  handleSubmit(event) {
    console.log("EVENT", event)
    event.preventDefault()
    console.log("SENDING", this.state)
    this.props.createEvent({ ...this.state})
    // this.props.createRecord({ ...this.state});
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
          <label>EndDate</label>
          {/* <DateInput source="endDate"/> */}
          {/* <DateInput source="endDate" label="End time" options={{ format: 'DD/MM/YYYY'}}/> */}
          <input name="endDate" onChange={this.handleChange}  type="text" className='form-control'
          placeholder='MM/dd/yyyy'
         />
        </div>
        <div className="col">
         <label>Type</label>
          <select  onChange={this.handleChange2} placeholder="type" name="type" className="form-control">
        <option disabled selected value="Type">Select Type</option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Row">Row</option>
          <option value="Random">Random</option>
          </select>
        </div>
      <button type="submit" className="btn btn-secondary">Add Event</button>
      </div>
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

    createEvent: (event) => dispatch(createEvent(event, history)),
    createRecord: (event) => dispatch(createRecord(event, history))
  };
};

export default connect(mapStateToProps, mapDispatch)(CreateEvent);
