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
    };
}

componentDidMount(){
  this.props.fetchResults()
  this.props.fetchUsers()
  this.props.fetchRecords()
  const  allresults = this.props.allResults
}


render () {
  const result = this.props.allResults
  const records = this.props.allResults

  console.log("records", records)
  const sorted = result.sort((a, b) => (a.eventId -b.eventId || parseInt(a.time) - parseInt(b.time)))
    // return parseInt(a.time) - parseInt(b.time);
// });

  // const sorted = this.props.allResults.sort((a,b) => {a.userId < b.userId})

  return (
    <div>
      <div>
        <select value={"Hi"} onChange={e => this.sort(e.target.value)} id="rating" className='custom-select'>
              <option value="disabled">Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
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
    {sorted.map((result) => {
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
