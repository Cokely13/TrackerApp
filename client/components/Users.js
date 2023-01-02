import React from 'react'
import { connect} from 'react-redux'
import { fetchUsers } from '../store/allUsersStore';

export class Users extends React.Component {
  constructor() {
    super();
    this.state = {
    };

}

componentDidMount(){
  this.props.fetchUsers()
}


render () {
  return (
    <table className="table">
    <thead>
      <tr>
        <th scope="col"># ID</th>
        <th scope="col">Name</th>
        <th scope="col">Events Completed</th>
        <th scope="col">Events Upcoming</th>
      </tr>
    </thead>
    <tbody>
        {this.props.allUsers.map((user)=>{
          return (
       <tr key={user.id}>
        <th scope="row">{user.id}</th>
        <td>{user.username}</td>
        <td>4</td>
        <td>3</td>
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
    allUsers: state.allUsers
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapState, mapDispatch)(Users)
