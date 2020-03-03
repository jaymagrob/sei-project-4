import React from 'react'
import axios from 'axios'
import ImageUpload from '../common/ImageUpload'
import Auth from '../../lib/auth'
import Select from 'react-select'
import Sidebar from './Sidebar'
import BoardDetail from './BoardDetail'

class Task extends React.Component {
  state = {
    tasks: [],
    newTask: {
      task_name:  "Add New Task"
    }
  }

  async componentDidMount() {
    try {
      const id = this.props.boardId
      const res = await axios.get(`/api/tasks/${id}/task/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({tasks: res.data})
    } catch (err) {
      console.log(err)
    }
  }

  async refreshTask() {
    try {
      const id = this.props.boardId
      const res = await axios.get(`/api/tasks/${id}/task/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({tasks: res.data})
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeNew = e => {
    const newTask = { ...this.state.newTask, task_name: e.target.value }
    this.setState({ newTask })
  }

  handleNewSubmit = async e => {
    e.preventDefault()
    try {
      const id = this.props.boardId
      const res = await axios.post(`/api/tasks/${id}/task/`, this.state.newTask, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({task_name: "Add New Task"})
      this.refreshTask()
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.props.boardId)
    return (
      <>
        <h2 className="subtitle">Tasks</h2>
        {this.state.tasks.map(task => (
          <div key={task.id} className='box'>
            <div className="tile is-ancestor">
              <div className="tile is-parent">
              <article className="tile is-child box">
                <p className="">{task.task_name}</p>          
              </article>
              </div>
            </div>
          </div>
        ))}
        <h2 className="subtitle">New Task</h2>
          <div className='box'>
          <form
            onSubmit={this.handleNewSubmit}
          >
            <div className="tile is-ancestor">
              <div className="tile is-10 is-parent">
              <article className="tile is-child box">
                <input
                  type='input'
                  className='input'
                  placeholder="New Task"
                  name="task_name"
                  value={this.state.newTask.task_name}
                  onChange={this.handleChangeNew}                
                />
              </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                <div className="is-hover">
                <div class="control">
                <button class="button is-primary">Submit</button>
              </div>

        </div>
      </article>
    </div>       
            </div>
          </form>                
          </div>
      </>
    )
  }
}
export default Task
