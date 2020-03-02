import React from 'react'
import axios from 'axios'
import ImageUpload from '../common/ImageUpload'
import Auth from '../../lib/auth'
import Select from 'react-select'
import Sidebar from './Sidebar'
import BoardDetail from './BoardDetail'

class Board extends React.Component {
  state = {
    board: {},
    boards: [],
    users: [],
    tasks: [],
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.id
      const res = await axios.get(`/api/boards/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({board: res.data})
    } catch (err) {
      console.log(err)
    }

    try {
      const res = await axios.get(`/api/profile`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({boards: res.data.boards_assigned})
    } catch (err) {
      console.log(err)
    }
    
    try {
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      const users = res.data.map(user => (
        { value: user.id, label: user.name }
      ))
      this.setState({ users })
    } catch (err) {
      console.log(err)
    }

    try {
      const id = this.props.match.params.id
      const res = await axios.get(`/api/tasks/${id}/task/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('sdfsdfsfsdfsf',res.data)
      this.setState({tasks: res.data})
    } catch (err) {
      console.log('sdfsdfd',err)
    }


  }

  async componentDidUpdate() {    
    if (parseInt(this.props.match.params.id) !== this.state.board.id) {
      try {
        const id = this.props.match.params.id
        const res = await axios.get(`/api/boards/${id}`, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.setState({board: res.data})
      } catch (err) {
        console.log(err)
      }
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {      
      const res = await axios.put(`/api/boards/${this.state.board.id}/`, this.state.board, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })  
      this.setState({board: res.data})
      console.log('SUCCESS')
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
      console.log(err)
    }
  }

  handleChange = e => {
    const board = { ...this.state.board, [e.target.name]: e.target.value }
    this.setState({ board })
    console.log('state',this.state.board)
  }

  handleMultiChange = (e) => {
    const lookingFor = e ? e.map(item => item.value) : []
    const newData = { ...this.state.board, users: lookingFor }
    this.setState({ board: newData  })
  }

  render() {
    console.log(this.state)
    return (
      <div class="columns">
      <div class="column is-one-quarter">
        <Sidebar 
          boards={this.state.boards}
        />
      </div>
      <div class="column">
        <BoardDetail
          board={this.state.board}
          users={this.state.users}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleMultiChange={this.handleMultiChange}
          tasks={this.state.tasks}
        />
      </div>      
    </div>
    )
  }
}
export default Board