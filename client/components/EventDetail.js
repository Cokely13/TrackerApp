import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { fetchEvent } from '../store/singleEventStore'
import { deleteEvent } from '../store/allEventsStore'
import { updateSingleEvent } from '../store/singleEventStore'
import {createRegisteredEvent, fetchRegisteredEvents} from '../store/allRegisteredEventsStore'
// import {fetchRegisteredEvents} from '../store/singleRegisteredEventStore'
import { fetchResults } from '../store/allResultsStore'
import { createRecord } from '../store/allRecordsStore'
import { fetchRecords } from '../store/allRecordsStore'
import { fetchUsers } from '../store/allUsersStore'
import { updateSingleRecord } from '../store/singleRecordStore'
import Records from './Records'
import eventsReducer from '../store/allEventsStore'


export class EventDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      // record: "",
      // recordHolderName: "",
      // recordHolderId: ""
      edit: false,
      id: "",
      eventName: "",
      description: "",
      endDate: "",
      type: "",
      createdBy: "",
      image: ""
    };

     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleSubmit2 = this.handleSubmit2.bind(this)
     this.handleClick = this.handleClick.bind(this)
    //  this.handleChange =this.handleChange(this)
     this.handleChange2 = this.handleChange2.bind(this)
    //  this.handleSubmit2 = this.handleSubmit2.bind(this);
}


componentDidMount(props){
  this.props.fetchEvent(this.props.match.params.eventId)
  this.props.fetchResults()
  this.props.fetchRecords()
  this.props.fetchUsers()
  this.props.fetchRegisteredEvents()
  // console.log("check", this.props)
}

handleSubmit(event) {
  event.preventDefault();
  const newReg = {
    eventName: this.props.singleEvent.eventName,
    description: this.props.singleEvent.description,
    eventId: this.props.singleEvent.id,
    userId: this.props.userId,
    image: this.props.singleEvent.image,
    type: this.props.singleEvent.type,
    endDate: this.props.singleEvent.endDate
  }
  this.props.createRegisteredEvent(newReg)
  // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
  // this.props.updateSingleEvent(update)
}

handleSubmit2(event) {
  event.preventDefault();
  const updateEvent = {
    eventName: this.state.eventName,
    description: this.state.description,
    createdBy: this.state.createdBy,
    endDate: this.state.endDate,
    image: this.state.image,
    type: this.state.type,
    id: this.state.id
  }
  this.props.updateSingleEvent(updateEvent);
  this.setState ({
    edit: false,
  })
}

handleClick(event, singleEvent){
  console.log("SINGLE", singleEvent)
  this.setState ({
    edit: true,
    id: singleEvent.id,
    createdBy: singleEvent.createdBy,
    eventName: singleEvent.eventName,
    description: singleEvent.description,
    endDate: singleEvent.endDate,
    type: singleEvent.type,
    image: singleEvent.image
  })

  console.log("STATE", this.state)
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
    if (prop == "Random"){
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

handleChange(event) {
  // event.persist()
  console.log("EVENT", event)
  this.setState({
    [event.target.name]: event.target.value,
  })
}
// handleSubmit2(event) {
//   event.preventDefault();
//   this.setState({
//       record: record.time,
//       recordHolderName: record.userName,
//       recordHolderId: record.userId
//   });
//   const update = {
//     eventName: this.props.singleEvent.eventName,
//     description: this.props.singleEvent.description,
//     eventId: this.props.singleEvent.id,
//     userId: this.props.userId,
//     image: this.props.singleEvent.image,
//     endDate: this.props.singleEvent.endDate,
//     // record: record.time,
//     // recordHolderName: record.userName,
//     // recordHolderId: record.userId
//   }
//   // console.log("UPDATE", this.state)
//   // this.props.updateSingleEvent()
//   // const update = {champ: record.name, eventId: this.props.singleEvent.id,}
//   // this.props.updateSingleEvent(update)
// }


render () {
  const singleEvent = this.props.singleEvent
  const myId = this.props.userId
  const eventId = this.props.match.params.eventId
  const registered = this.props.registeredEvents.filter(event => event.eventId == eventId)
  const registeredId = registered.filter(event => event.userId == myId)
  const record= this.props.allRecords.filter(record=> record.eventId == eventId)
  const myResults = this.props.allResults.filter(result => result.eventId == eventId)
  const sorted = myResults.sort((a, b) => (parseInt(a.time) - parseInt(b.time)))
  const tempRecord = sorted[0]
  const myRecord = record[0]
  const users = this.props.allUsers
  const today = new Date();
  const  todayDate = today.toISOString().substring(0, 10);
  const regUsers =registered.map(({ user }) => user)
  // const eventName = this.state.

  console.log("regusersr", this.state)



  return (
    // <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>

    <div style={{marginTop:"50px"}}>

    {this.state.edit? <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit2}>
      <div className="form-row">
      <div className="col">
        <label>Event Name</label>
          <input name='eventName' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.eventName} />
        </div>
        <div className="col">
        <label>Description</label>
          <input name='description' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.description}/>
        </div>
        <div className="col">
        <label>End Date</label>
          <input name='endDate' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.endDate}/>
        </div>
        <div className="col">
        <label>Type</label>
          {/* <input name='type' onChange={event => this.handleChange(event)}  type="text" className='form-control' placeholder={myEvent.type} /> */}

          <label>Type</label>
          <select  onChange={this.handleChange2} name="type" className="form-control">
          <option  defaultValue={this.state.type}>{this.state.type}</option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Row">Row</option>
          <option value="Random">Random</option>
          </select>
        </div>
      <button type="submit" className="btn btn-secondary">Update Event</button>
      </div>
    </form>
  </div> :<div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
    <div className ="card grid text-center" style={{width: "18rem"}}  >
    <img src={this.props.singleEvent.image} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{this.props.singleEvent.eventName}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Type: {this.props.singleEvent.type}</h5>
    <p className="card-text">{this.props.singleEvent.description}</p>
    <h5 className="card-subtitle mb-2 text-muted">End Date: {this.props.singleEvent.endDate}</h5>
   {todayDate >= this.props.singleEvent.endDate ? <div>Too Late To Register</div> : registeredId.length ? <div>Already Registered </div> : <Link className="btn btn-primary" onClick={this.handleSubmit} to='/profile' >Register</Link>}
   <p></p>
   <h5>{this.props.singleEvent.createdBy == myId ?  <button className="btn btn-primary"  onClick={event => this.handleClick(event, singleEvent)}>Edit Event</button> : <div></div>}</h5>
   <p></p>
   <h5>{this.props.singleEvent.createdBy == myId ?  <button className="btn btn-primary"  onClick={() => this.props.deleteEvent(eventId)} >Delete Event</button> : <div></div>}</h5>
  </div>
</div>
</div> }

<div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:"15px", marginBottom:"15px"}} ><u>Registered Users</u> </h2>
{/* <div className ="card" style={{width: "18rem"}}>
<div className="card-body"> */}
<div className="card-group">
{/* {registered.length ? regUsers.map((event) => {
     return (
      <div className='col' key={event.id }>
      <div className ="card" style={{width: "18rem"}} >
      <img src={event.imageUrl ? event.imageUrl : none} className="card-img-top" />
<div className="card-body">
 <h6 className="card-text" >Name: {event.username}</h6>
 </div>
 </div>
 </div>
 )}): <div> No Users</div>} */}
 </div>
 {/* </div>
 </div> */}
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:"15px", marginBottom:"15px"}}><u>Results</u>
</h2>

{sorted.length?
sorted.map((result) => {
     return (
      <div>
      <div className="container text-center">
      <div className="row align-items-start">
        <h3 className="col">
          UserName
        </h3>
        <h3 className="col">
          Time
        </h3>
        </div>
        </div>
     <div className="container text-center"key={result.id}>
     <div className="row align-items-start">
     <div className="col" ><Link to={`/users/${result.userId}`}>{result.userName}</Link>
</div>
<div className="col">
  {result.time}
</div>
</div>
</div>
</div>
)}): <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>No Results Yet</h1> }
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop:"15px", marginBottom:"15px"}}><u>Current Record</u></h2>
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">Record Holder: {tempRecord? tempRecord.userName : "N/A" }</h5>
<h5 className="card-title">Record: {tempRecord ? tempRecord.time : "N/A" }</h5>
<h5>{this.props.singleEvent.record ? <Link className="btn btn-primary" onClick={() => this.props.updateSingleRecord(tempRecord, this.props.singleEvent.record.id)} to='/records'> Update All Time Record</Link>: <button className="btn btn-primary" onClick={() => this.props.createRecord(tempRecord)} > Create Record</button>}</h5>
</div>
</div>
</div>
</div>
<h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:"15px", marginBottom:"15px"}}><u>All Time Record</u></h2>
<div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
<div className ="card" style={{width: "18rem"}} >
<div className="card-body">
<h5 className="card-title">Record Holder: {myRecord ? myRecord.userName : "No Record Yet" }</h5>
<h5 className="card-title">Record: {myRecord ? myRecord.time : "No Record Yet" }</h5>
</div>
</div>
</div>
</div>
// </div>
)
}}

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  singleEvent: state.singleEvent,
  allUsers: state.allUsers,
  allResults: state.allResults,
  allRecords: state.allRecords,
  registeredEvents: state.registeredEvents
})

const mapDispatchToProps = (dispatch, { history }) => {
  return{
    fetchEvent: (id) => {dispatch(fetchEvent(id))},
    updateSingleEvent: (event) => dispatch(updateSingleEvent(event, history)),
    createRegisteredEvent: (event) => dispatch(createRegisteredEvent(event, history)),
    fetchResults: () => dispatch(fetchResults()),
    fetchUsers: () => dispatch(fetchUsers()),
    createRecord: (event) => dispatch(createRecord(event, history)),
    fetchRecords: (id) => {dispatch(fetchRecords(id))},
    updateSingleRecord: (event, id, history) => dispatch(updateSingleRecord(event, id, history)),
    fetchRegisteredEvents: () => {dispatch(fetchRegisteredEvents())},
    deleteEvent: (id) => (dispatch(deleteEvent(id, history)))
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail)
