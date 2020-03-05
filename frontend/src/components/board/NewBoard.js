import React from 'react'
import axios from 'axios'
import ImageUpload from '../common/ImageUpload'
import Auth from '../../lib/auth'
import Select from 'react-select'

class NewBoard extends React.Component {
  state = {
    data: {     
        board_name: '',
        description: '',
        image: 'https://picsum.photos/id/237/200/300',
        budget: 0,
        owner: '',
        users: []
    },
    errors: {},
    users: [],
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const users = res.data.map(user => (
        { value: user.id, label: user.name }
      ))
      this.setState({ users})
    } catch (err) {
      console.log(err)
    }
  }

  handleMultiChange = (e) => {
    const lookingFor = e ? e.map(item => item.value) : []
    const newData = { ...this.state.data, users: lookingFor }
    this.setState({ data: newData  })
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleChangeImage = ({ target: { name, value } }) => {
    console.log('HERE',name, value)
    const data = { ...this.state.data}
    data.image = value
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {      
      const res = await axios.post('/api/boards/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })  
      this.props.history.push(`/project/${res.data.id}`)
    } catch (err) {    
      const { board_name,description,image,budget,owner,users} = err.response.data
      const errorObj = {
        board_name: !board_name? null : board_name[0],
        description: !description? null : description[0],
        image: !image? null : image[0],
        budget: !budget? null : budget[0],
        owner: !owner? null : owner[0],
        users: !users? null : users[0]
      }
      this.setState({ errors: errorObj })
    }
  }
  
  render() {
    console.log(this.state.data)
    return (
      <section className="is-fullheight-with-navbar hero section_padding">
      <div className="hero-body columns is-fullwidth">
        <div className="column is-quarter-desktop"></div>
        <div className='has-background-info  column is-three-quarters-mobile is-half-tablet is-one-third-desktop box'>
          <form onSubmit={this.handleSubmit}>
            <div className="title-underLine">
              <h2 className="subtitle-hero is-4 padding-v-10">New Project</h2>
            </div>

            <div className="field">
              <label className="form-fields">Name</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.board_name ? 'display' : null}`}
                  placeholder="Name"
                  name="board_name"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.board_name && <p className="help is-danger">{this.state.errors.board_name}</p>}
            </div>            
    
            <div className="field">
              <label className="form-fields">Description</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.description ? 'display' : ''}`}
                  placeholder="Description"
                  name="description"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.description && <p className="help is-danger">{this.state.errors.description}</p>}
            </div>   

            <div className="field">
              <label className="form-fields">Budget</label>
              <div className="control">
                <input
                  className={`number ${this.state.errors.budget ? 'display' : ''}`}
                  placeholder="Budget"
                  type='number'
                  name="budget"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.budget && <p className="help is-danger">{this.state.errors.budget}</p>}
            </div>

            <div className="field">
              <div className="form-fields">Upload Profile Image</div>
              <div className="control">  
                <ImageUpload
                  labelText="Upload your profile image"
                  onChange={this.handleChange}
                  required
                  name="image"
                  handleChangeImage={this.handleChangeImage}
                  fieldName="image"
                />
              </div>
              {this.state.errors.image && <p className="help is-danger">{this.state.errors.image}</p>}
            </div>

            <div className="field">
              <label className="form-fields">Users</label>
                <div className="control">        
                  <Select
                    options={this.state.users}
                    isMulti                  
                    onChange={(e) => this.handleMultiChange(e)}
                  />
                </div>
                {this.state.errors.users && <p className="help is-danger">{this.state.errors.users}</p>}
              </div>
            

            <div className="field">
              <div className="control">
                <button className="button is-warning has-text-white is-fullwidth" type="submit">Create Board</button>            
              </div>
            </div>             
          </form>
        </div>
        <div className="column is-quarter-desktop"></div>
      </div>
    </section>
    )
  }
}
export default NewBoard