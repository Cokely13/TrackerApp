import React from 'react'
import { connect} from 'react-redux'
import { fetchResults } from '../store/allResultsStore'
import { fetchUsers } from '../store/allUsersStore';


export class Results extends React.Component {
  constructor() {
    super();
    this.state = {
      sort: 1
    };
    this.sort = this.sort.bind(this)
}

componentDidMount(){
  this.props.fetchResults()
  this.props.fetchUsers()
  const  allresults = this.props.allResults
}

sort(event) {
  console.log("HiLL", event)
}

render () {
  console.log("results", this.props.allResults)
  const sorted = this.props.allResults.sort((a,b) =>
  {a.id < b.id})
  console.log("sorted", sorted)

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
          <div className="col" >
        {result.userName}
    </div>
        <div className="col" >
        {result.userId}
    </div>
    <div className="col" >
        {result.eventId}
    </div>
    <div className="col">
     {result.eventName}
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
    allResults: state.allResults
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchResults: () => dispatch(fetchResults()),
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Results)
