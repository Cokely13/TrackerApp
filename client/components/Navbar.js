import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div style={{marginBottom:"20px"}}>
    <h1>Fittest Of The Friends</h1>
    <nav className="navbar navbar-dark bg-dark fixed-top">
    {isLoggedIn ? (
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Fittest Of The Friends</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        {/* <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5> */}
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/events">Events</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/results">Results</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/records">Records</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/users">Users</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span className="bi bi-person"></span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="/profile">Profile</a></li>
              <li><a className="dropdown-item" href="/details">Details</a></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><a className="dropdown-item" href="#" onClick={handleClick}>Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>)
  : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
</nav>







  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
