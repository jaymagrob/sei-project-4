import React from 'react'
import axios from 'axios'
import ImageUpload from '../common/ImageUpload'
import Auth from '../../lib/auth'
import Select from 'react-select'
import Sidebar from './Sidebar'
import BoardDetail from './BoardDetail'
import CommentBoard from './CommentBoard'


class Board extends React.Component {
  state = {
    board: {},
    boards: [],
    users: [],
    tasks: [],
    defaultUser: [],
    comments: [],
    comment: 'Add a comment...',
    modal: false
  }
  
  async componentDidMount() {
    try {
      const id = this.props.match.params.id
      const res = await axios.get(`/api/boards/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({board: res.data})
    } catch (err) {
      this.props.history.push('/unauthorised')
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
      const defaultUser = users.filter(user =>(
        this.state.board.users.indexOf(user.value) !== -1 || this.state.board.owner == user.value
      ))       
      this.setState({ users, defaultUser })
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

    try {
      const id = this.props.match.params.id
      const res = await axios.get(`/api/boards/${id}/comment/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('sdfsdfsfsdfsf',res.data)
      this.setState({comments: res.data})
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

  refreshComments = async() => {
    try {
      const id = this.props.match.params.id
      const res = await axios.get(`/api/boards/${id}/comment/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log('sdfsdfsfsdfsf',res.data)
      this.setState({comments: res.data})
    } catch (err) {
      console.log('sdfsdfd',err)
    }
  }

  

  handleChange = e => {
    const board = { ...this.state.board, [e.target.name]: e.target.value }
    this.setState({ board })
  }

  handleMultiChange = (e) => {
    const lookingFor = e ? e.map(item => item.value) : []
    const newData = { ...this.state.board, users: lookingFor }
    this.setState({ board: newData, defaultUser: e})
  }

  handleModal = e => {
    if(e.target.innerHTML === 'Comments') {
      this.setState({modal: true})
    } else {
      this.setState({modal: false})
    }
  }

  handleDelete = async e => {
      try {
        const id = this.props.match.params.id
        const commentId = parseInt(e.target.id)
        const res = await axios.delete(`/api/boards/${id}/comment/${commentId}/`, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.refreshComments()
      } catch (err) {
        console.log(err)
      }
  }
  
  handleAddComment = async e => {
    e.preventDefault()
      try {
        const id = this.props.match.params.id
        const data = {
          comment: this.state.comment
        }
        const res = await axios.post(`/api/boards/${id}/comment/`, data, {
          headers: { Authorization: `Bearer ${Auth.getToken()}` }
        })
        this.refreshComments()
      } catch (err) {
        console.log(err)
      }
  }

  handleChangeComment = e => {
    this.setState({ comment: e.target.value })
  }
  

  render() {
    return (
      <div class="columns">
        <div class="column"></div>
        <div class='column is-three-quarters-desktop has-background-info box'>
        <button
          className="button is-round is-warning"
          onClick={this.handleModal}
          >Comments</button>
          
        <CommentBoard
          modal={this.state.modal}
          comments={this.state.comments}
          handleModal={this.handleModal}
          handleDelete={this.handleDelete}
          handleAddComment={this.handleAddComment}
          comment={this.state.comment}
          handleChangeComment={this.handleChangeComment}
        />
        <BoardDetail
          board={this.state.board}
          users={this.state.users}
          defaultUser={this.state.defaultUser}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleMultiChange={this.handleMultiChange}
          tasks={this.state.tasks}
          boardId={this.props.match.params.id}
          modal={this.handleModal}
        />
      </div>
      <div class="column"></div>  
    </div>
    )
  }
}
export default Board