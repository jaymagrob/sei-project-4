import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class ProfileEdit extends React.Component {
  state = {
    user: '',
    errors: ''
  }

  handleChange = e => {
    const user = { ...this.state.user, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ user, errors })
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

  handleSubmit = async e => {
    e.preventDefault()
    try {
        const res = await axios.put('/api/profile/', this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log(res.data)
    } catch (err) {
      const { password, password_confirmation, username, email, name } = err.response.data
      const errorObj = {
        username: !username ? null : username[0],
        name: !name ? null : name[0],
        email: !email ? null : email[0],
        password: !password ? null : password[0],
        password_confirmation: !password_confirmation ? null : password_confirmation[0]
      }
      console.log(errorObj)
      this.setState({ errors: errorObj })
    }
  }

  render() {  
    if (!this.state.user) return null
    return (
<section className="is-fullheight-with-navbar hero section_padding">
      <div className="hero-body columns is-fullwidth">
        <div className="column is-quarter-desktop"></div>
        <div className='has-background-info column is-three-quarters-mobile is-half-tablet is-one-third-desktop box'>
          
          
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                onChange={this.handleChange}
                value={this.state.user.name}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
                value={this.state.user.username}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.user.email}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Company</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Company"
                name="company"
                onChange={this.handleChange}
                value={this.state.user.company}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Title"
                name="title"
                onChange={this.handleChange}
                value={this.state.user.title}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Bio</label>
            <div className="control">
              <textarea
                className="textarea"
                type="text"
                placeholder="Bio"
                name="bio"
                rows='3'
                onChange={this.handleChange}
                value={this.state.user.bio}
              ></textarea>
            </div>
          </div>

          <div class="control">
            <button class="button is-round is-warning is-fullwidth">Submit</button>
          </div>

        </form>
        </div>
        <div className="column is-quarter-desktop"></div>
      </div>
    </section>
    )
  }
}

export default ProfileEdit


