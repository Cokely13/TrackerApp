import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchResults } from '../store/allResultsStore'
import { fetchUsers } from '../store/allUsersStore';
import { fetchRecords} from '../store/allRecordsStore'


export class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      filterEvents: ""
    };
    this.handleChange = this.handleChange.bind(this)
}

componentDidMount(){
  this.props.fetchResults()
  this.props.fetchUsers()
  this.props.fetchRecords()
  const  allresults = this.props.allResults
}

handleChange(event) {
  // console.log("id", this.props.singleResult.id,)
  // console.log("prop", this.props.singleResult,)
  this.setState({
    [event.target.name]:event.target.value,
    // image: this.props.singleEvent.image
  })

  // console.log("STATEEE", this.state)
  };


render () {
  const result = this.props.allResults
  const records = this.props.allResults
  const eventsIn = this.state.filterEvents
  let eventIds = result.map(({ eventId }) => eventId)
  let unique = eventIds.filter((item, i, ar) => ar.indexOf(item) === i)
  console.log("records", unique)
  const sorted = result.sort((a, b) => (a.eventId -b.eventId || parseInt(a.time) - parseInt(b.time)))
    // return parseInt(a.time) - parseInt(b.time);
// });

  // const sorted = this.props.allResults.sort((a,b) => {a.userId < b.userId})

  return (
    <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>RESULTS: </h1>
      <div>
        <select onChange={this.handleChange} name="filterEvents" className='custom-select'>
              <option value="">Filter by Event Id</option>
              {unique.map((event) => <option key={event} value={event}>{event}</option>)}
              {/* <option value="2">2</option>
              <option value="6">6</option>
              <option value="7">7</option> */}
            </select>
          </div>
    <div className="container text-center">
  <div className="row align-items-start">
    <div className="col">
      UserName
    </div>
    <div className="col">
      UserId
    </div>
    <div className="col">
      EventId
    </div>
    <div className="col">
     Event Name
    </div>
    <div className="col">
      Time
    </div>
    </div>
    </div>
    <div>
    {/* this.props.registeredEvents.filter(registeredEvent => registeredEvent.userId === myId) */}
    {eventsIn.length ? sorted.filter(event=> event.eventId == eventsIn).map((result) => {
        return (<div className="container text-center"key={result.id}>
          <div className="row align-items-start">
          <div className="col" ><Link to={`/users/${result.userId}`}>{result.userName}</Link>
    </div>
        <div className="col" ><Link to={`/users/${result.userId}`}>{result.userId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventName}</Link>
    </div>
    <div className="col">
       {result.time}
    </div>
    </div>
    </div>)}) : sorted.map((result) => {
        return (<div className="container text-center"key={result.id}>
          <div className="row align-items-start">
          <div className="col" ><Link to={`/users/${result.userId}`}>{result.userName}</Link>
    </div>
        <div className="col" ><Link to={`/users/${result.userId}`}>{result.userId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventId}</Link>
    </div>
    <div className="col"><Link to={`/events/${result.eventId}`}>
        {result.eventName}</Link>
    </div>
    <div className="col">
       {result.time}
    </div>
    </div>
    </div>)})}
    </div>
    </div>
    )
}
}



const mapState = (state) => {
  return{
    allResults: state.allResults,
    allRecords: state.allRecords
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchRecords: () => dispatch(fetchRecords())
  };
};

export default connect(mapState, mapDispatch)(Results)
