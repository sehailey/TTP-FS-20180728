import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {isLoggedIn ? (
        <ul className="navbar-nav mr-auto">
          {/* The navbar will show these links after you log in */}
          <li className="nav-item active">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="localhost" onClick={handleClick}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav mr-auto">
          {/* The navbar will show these links before you log in */}
          <li className="nav-item active">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)
