import React from 'react'
import { connect} from 'react-redux'
import { fetchUsers } from '../store/allUsersStore';
import { Link } from 'react-router-dom';
import {fetchResults} from '../store/allResultsStore'
import { fetchRegisteredEvents } from '../store/allRegisteredEventsStore';


export class Users extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(){
  this.props.fetchUsers()
  this.props.fetchResults()
  this.props.fetchRegisteredEvents()
}


render () {

  const results = this.props.allResults
  const registeredEvents = this.props.registeredEvents
  console.log("Results", registeredEvents)

  return (
    <div style={{marginTop:"200px"}}>
    <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center',marginTop: "50px"}}><u>Users</u></h1>
    <table className="table">
    <thead>
      <tr>
        <th scope="col"><u>Name</u></th>
        <th scope="col"><u>Registered Events</u></th>
        <th scope="col"><u>Completed Events</u></th>
        <th scope="col"><u>Results</u></th>
      </tr>
    </thead>
    <tbody>
        {this.props.allUsers.map((user)=>{
          return (
       <tr key={user.id}>
        {/* <Link> */}
        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
        <td>{registeredEvents.filter(registeredEvent => registeredEvent.userId == user.id && registeredEvent.completed == false).length}</td>
        <td>{registeredEvents.filter(registeredEvent => registeredEvent.userId == user.id && registeredEvent.completed == true).length}</td>
        <td>{results.filter(result => result.userId == user.id).length}</td>
        {/* </Link> */}
      </tr>
          )
        })}
    </tbody>
  </table>
  </div>
  )
}
}

const mapState = (state) => {
  return{
    allUsers: state.allUsers,
    allResults: state.allResults,
    registeredEvents: state.registeredEvents
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchResults: () =>dispatch(fetchResults()),
    fetchRegisteredEvents: () =>dispatch(fetchRegisteredEvents())
  };
};

export default connect(mapState, mapDispatch)(Users)
