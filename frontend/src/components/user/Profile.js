import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class Profile extends React.Component {
  state = {
    user: ''
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const { id, board_owned, boards_assigned, username, first_name, last_name, email, name, profile_image, bio, company, title  } = this.state.user
    if (!this.state.user) return null
    return (
      <section className="section">
        <h1>Welcome {name} </h1>
        <h2>Owned Projects</h2>
        {/* {hold for list of projects} */}
        <h2>Here Are Projects Your A Part Of</h2>
        {/* {hold for list of projects} */}
        <Link to='/board/new'><button className='button'>Start New Board</button></Link>
        <Link to='/profile/edit'><button className='button'>Edit Your Profile</button></Link>
        <Link to='/profile/delete'><button className='button'>Delete Your Account</button></Link>
      </section>
    )
  }
}

export default Profile