import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/auth'
import axios from 'axios'

const Sidebar = ({boards} = this.props) => (
    
      <aside className="menu">
        <p className="menu-label">
          Projects
        </p>
        <ul className="menu-list">
          <li><Link to="/project/new">New Project</Link></li>
          {boards.map(board => (
          <li key={board.id}><Link to={`/project/${board.id}`}>{board.board_name}</Link></li>
          ))}
        </ul>
        <p className="menu-label">
          Admin
        </p>
        <ul className="menu-list">
          <li><Link to="/profile/edit">Edit Profile</Link></li>
          
        </ul>
      </aside>
    )
export default Sidebar