import React from 'react'
import { connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchSingleUser, updateSingleUser } from '../store/singleUserStore';



export class Details extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      email: "",
      id: "",
      imageUrl: "",
      birthday: "",
      name: "",
      password: "",
      username: "",
    };

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit2 = this.handleSubmit2.bind(this)
}

componentDidMount(){

  this.props.fetchSingleUser(this.props.userId)
}

handleClick(event, user){
  this.setState ({
    edit: true,
      email: user.email,
      id: user.id,
      imageUrl: user.imageUrl,
      birthday: user.birthday,
      name: user.name,
      username: user.username
  })
}

handleChange(event) {
  // event.persist()
  console.log("EVENT", event)
  this.setState({
    [event.target.name]: event.target.value,
  })
}

handleSubmit2(event) {
  event.preventDefault();
  const updateDetails = {
    email: this.state.email,
    id: this.state.id,
    imageUrl: this.state.imageUrl,
    name: this.state.name,
    username: this.state.username,
    birthday: this.state.birthday
  }
  this.props.updateSingleUser(updateDetails);
  this.setState ({
    edit: false,
  })
}


render () {
  const myDetails = this.props.singleUser
  const results = this.props.allResults
  const registeredEvents = this.props.registeredEvents
  console.log("Results", myDetails)
  console.log("State", this.state)

  return (

    <div style={{marginTop:"50px"}}>

    {this.state.edit? <div className="mb-4 col">
    <form action="" onSubmit={this.handleSubmit2}>
      <div className="form-row">
      <div className="col">
        <label>UserName</label>
          <input name='username' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.username} />
        </div>
        <div className="col">
        <label>Email</label>
          <input name='email' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.email}/>
        </div>
        <div className="col">
        <label>Name</label>
          <input name='name' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.name}/>
        </div>
        <div className="col">
        <label>Birthday</label>
          <input name='birthday' onChange={event => this.handleChange(event)} type="text" className='form-control' value={this.state.birthday}/>
        </div>
        <div className="col">
      <button type="submit" className="btn btn-secondary" >Update Details</button>
      </div>
      </div>
    </form>
  </div> :<div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
    <div className ="card grid text-center" style={{width: "18rem"}}  >
    <img src={myDetails.imageUrl} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{myDetails.username}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Birthday: {myDetails.birthday}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Name: {myDetails.name}</h5>
    <h5 className="card-subtitle mb-2 text-muted">Email: {myDetails.email}</h5>
   <p></p>
    <button className="btn btn-primary"  onClick={event => this.handleClick(event, myDetails)} >Edit Details</button>
   <p></p>
  </div>
</div>
</div> }

</div>
  )
}
}

const mapState = (state) => {
  return{
    singleUser: state.singleUser,
    userId: state.auth.id,
  }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchSingleUser: (id) => dispatch(fetchSingleUser(id)),
    updateSingleUser: (event) => dispatch(updateSingleUser(event, history))
  };
};

export default connect(mapState, mapDispatch)(Details)
