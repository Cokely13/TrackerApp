import React from 'react'
import { connect} from 'react-redux'
import { fetchResults } from '../store/allResultsStore'
import { fetchUsers } from '../store/allUsersStore';

export class Results extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(){
  this.props.fetchResults()
  this.props.fetchUsers()
}


render () {
  console.log ("result", this.props.allResults)
  return (
    <div>
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
    {this.props.allResults.map((result) => {
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
}}

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
