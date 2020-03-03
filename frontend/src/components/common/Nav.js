import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'

class Navbar extends React.Component {
  state = { navbarOpen: false, name: null, username: null }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  handleClick = () => {
    this.setState({ navbarOpen: false })
  }

  handleLogout = () => {
    Auth.logout()
    this.props.history.push('/logout')

  }
  
  render() {
    const { navbarOpen } = this.state

    return (
      <nav className="navbar custom_nav">
        <div className="navbar-brand navbar-logo">
          <Link className="navbar-brand navbar-item" onClick={this.handleClick} to="/">Skarpa</Link>          
          <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>


        <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-item navbar-end">
            {Auth.isAuthenticated() &&
            <>
              <div className="navbar-item">
                <Link onClick={this.handleClick} to="/">SELECT PROJECT</Link>
              </div>
              <div className="navbar-item">
                <Link onClick={this.handleClick} to="/profile/edit">EDIT PROFILE</Link>
              </div>
              <div className="navbar-item">
                <a onClick={this.handleLogout}>LOGOUT {this.state.name}</a>
              </div>
            </>
            }
          </div>
                    
          {!Auth.isAuthenticated() &&
          <>
          <div className="navbar-item">
            <Link onClick={this.handleClick} to="/about">SKARPA</Link>
          </div>

          <div className="navbar-item">
            <Link onClick={this.handleClick} to="/register">REGISTER</Link>
          </div>
      
          <div className="navbar-item">
            <Link onClick={this.handleClick} to="/login">LOGIN</Link>
          </div>
          </>
          }
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)