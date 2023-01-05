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
    <table className="table">
    <thead>
      <tr>
        <th scope="col"># ID</th>
        <th scope="col">Name</th>
        <th scope="col">Registered Events</th>
        <th scope="col">Results</th>
      </tr>
    </thead>
    <tbody>
        {this.props.allUsers.map((user)=>{
          return (
       <tr key={user.id}>
        <th scope="row">{user.id}</th>
        {/* <Link> */}
        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
        <td>{registeredEvents.filter(registeredEvent => registeredEvent.userId == user.id).length}</td>
        <td>{results.filter(result => result.userId == user.id).length}</td>
        {/* </Link> */}
      </tr>
          )
        })}
    </tbody>
  </table>

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
