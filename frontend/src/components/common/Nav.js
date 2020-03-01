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
  }
  
  render() {
    const { navbarOpen } = this.state

    return (
      <nav className="navbar custom_nav">
        <div className="navbar-brand navbar-item-font navbar-logo">
          <Link className="navbar-brand navbar-item" onClick={this.handleClick} to="/">Skarpa</Link>          
          <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>


        <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-item navbar-end navbar-item-font">
            {Auth.isAuthenticated() && <Link onClick={this.handleClick} to="/projects/new">new project</Link>}
          </div>
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/search">start your journey</Link>
          </div>
          {Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to={`/users/${this.state.username}`}>my portfolio</Link>
          </div>
          }

          {Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link className="button" to="/mail">Mail</Link>
          </div>
          }
          
          <div className="navbar-item navbar-item-font">
            <button className="button" onClick={this.handleLogout}>logout {this.state.name}</button>
          </div>
          
          {!Auth.isAuthenticated() &&
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/register">register</Link>
          </div>
          }
          {!Auth.isAuthenticated() && 
          <div className="navbar-item navbar-item-font">
            <Link onClick={this.handleClick} to="/login">login</Link>
          </div>
          }
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)