// import React from 'react'
// import { connect} from 'react-redux'
// import { Link } from 'react-router-dom';
// // import "bootstrap/dist/css/bootstrap.min.css"
// // import axios from 'axios'

// export class Registration extends React.Component {
//   constructor(){
//     super()
//     this.state ={
//       username:'',
//       name: '',
//       email:'',
//       password:'',
//       birthday: '',
//     }
//     this.changeName =this.changeName.bind(this)
//     this.changeEmail =this.changeEmail.bind(this)
//     this.changeUsername =this.changeUsername.bind(this)
//     this.changePassword =this.changePassword.bind(this)
//     this.changeBirthday =this.changeBirthday.bind(this)
//     this.onSubmit =this.onSubmit.bind(this)
//   }

//   changeName(event){
//     this.setState({
//       name:event.target.value
//     })
//   }

//   changeUsername(event){
//     this.setState({
//       username:event.target.value
//     })
//   }

//   changeEmail(event){
//     this.setState({
//       email:event.target.value
//     })
//   }

//   changePassword(event){
//     this.setState({
//       password:event.target.value
//     })
//   }

//   changeBirthday(event){
//     this.setState({
//       password:event.target.value
//     })
//   }

//   onSubmit(event){
//     //prevents site from reloading
//     event.preventDefault()

//     const registered = {
//       name: this.state.name,
//       username: this.state.username,
//       email: this.state.email,
//       password: this.state.password,
//       birthday: this.state.birthday
//     }
//   }

//     render() {
//       return (
//         <div>
//           <div className='container'>
//             <div className='form-div'>
//               <form onSubmit={this.onSubmit}>
//                 <input type ='text'
//                 placeholder='Name'
//                 onChange={this.changeName}
//                 value={this.state.name}
//                 className="form-control form-group"
//                 />
//                 <input type='text'
//                 placeholder='UserName'
//                 onChange={this.changeUsername}
//                 value={this.state.username}
//                 className="form-control form-group"
//                 />
//                  <input type='text'
//                 placeholder='Email'
//                 onChange={this.changeEmail}
//                 value={this.state.email}
//                 className="form-control form-group"
//                 />
//                  <input type='password'
//                 placeholder='Password'
//                 onChange={this.changePassword}
//                 value={this.state.password}
//                 className="form-control form-group"
//                 />
//                  <input type='birthday'
//                 placeholder='Birthday'
//                 onChange={this.changeBirthday}
//                 value={this.state.birthday}
//                 className="form-control form-group"
//                 />

//                 <input type='submit' className='btn btn-danger btn-block' value='Submit'/>
//               </form>
//             </div>
//           </div>
//         </div>
//        )
//     }
// }


// // const mapState = (state) => {
// //   return{
// //   }
// // }

// // const mapDispatch = (dispatch, { history }) => {
// //   return {

// //   };
// // };

// export default connect(null, null)(Registration)

import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { signup } from '../store/auth';
import { Link} from "react-router-dom";
import { Button } from 'react-bootstrap'

function Registration(){
  const dispatch = useDispatch()
  const [user, setUser] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthday: ""
  })

  const [hideRequiredFlag, setHideRequiredFlag] = useState(true)
  const [matchPasswords, setMatchPasswords] = useState(true)

  function handleChange(evt) {
    setUser({...user, [evt.target.name]: evt.target.value});
  }

  function handleSubmit(event) {
      event.preventDefault();
      if (user.password === user.confirmPassword) {
          let {confirmPassword:_, ...newUser} = user
          for ( const [key, value] of Object.entries(newUser) ){
            if (value === 0)
              newUser[key] = 3
          }
          dispatch(signup({ ...newUser }))
      } else{
          setMatchPasswords(false)
          setHideRequiredFlag(false)
          setUser({...user,password:"", confirmPassword:""})
      }
  }

  return(
      <div className="module login" id="registration">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            {matchPasswords ? "" : <div className = "alertbox"> passwords do not match</div>}
          <div>
            <label htmlFor='email'>Email: </label>
            <input name='email' type="email" value={user.email} onChange={handleChange}/>
            {hideRequiredFlag ? "" : <div className = "alert">required field</div>}
          </div>

          <div>
            <label htmlFor='username'>Username: </label>
            <input name='username' value={user.username} onChange={handleChange}/>
            {hideRequiredFlag ? "" : <div className = "alert">required field</div>}
          </div>
          <div>
            <label htmlFor='birthday'>Birthday: </label>
            <input name='birthday' value={user.birthday} onChange={handleChange}/>
            {hideRequiredFlag ? "" : <div className = "alert">required field</div>}
          </div>

          <div>
            <label htmlFor='password'>Password: </label>
            <input name='password' type="password" value={user.password} onChange={handleChange}/>
            {hideRequiredFlag ? "" : <div className = "alert">required field</div>}
          </div>

          <div>
            <label htmlFor='confirmPassword'>Confirm Password: </label>
            <input name='confirmPassword' type="password" value={user.confirmPassword} onChange={handleChange}/>
            {hideRequiredFlag ? "" : <div className = "alert">required field</div>}
          </div>
        <div >
            <Button className="purple" type='submit'>submit</Button>
            &nbsp;&nbsp;&nbsp;
            <Button className="btn btn-danger"  type='button'><Link to='/'>Cancel</Link></Button>
          </div>
        </form>
      </div>
  )
}

export default Registration
