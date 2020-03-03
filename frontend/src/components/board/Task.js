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
    },
    showColumns: {
      task_name: true,
      status: true,
      start_date: true,
      end_date: true,
      users: true,
      delete: true
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

  handleChange = e => {
    let targetValue = (e.target.name === 'users') ? [e.target.value] : e.target.value
    const findTask = this.state.tasks.filter(i => i.id === parseInt(e.target.id))[0]
    const editTask = {...findTask, [e.target.name]: targetValue}
    const tasks = this.state.tasks.map(i => (i.id === parseInt(e.target.id)) ? editTask : i)
    this.setState({ tasks })
  
  }

  handleSubmit = async e => {
    
    try {
      const id = this.props.boardId
      const taskId = e.target.id      
      const findTask = this.state.tasks.filter(i => i.id === parseInt(e.target.id))[0]
      const res = await axios.put(`/api/tasks/${id}/task/${taskId}/`, findTask, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err)
    }


  }

  handleNewSubmit = async e => {
    e.preventDefault()
    console.log(Auth.getToken())
    try {
      const id = this.props.boardId
      const res = await axios.post(`/api/tasks/${id}/task/`, this.state.newTask, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({newTask : {task_name: "Add New Task"}})
      this.refreshTask()
    } catch (err) {
      console.log(err)
    }
  }

  handleDeleteTask = async e => {
    e.preventDefault()
    try {
      const id = this.props.boardId
      const taskId = e.target.id
      const res = await axios.delete(`/api/tasks/${id}/task/${taskId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.refreshTask()
    } catch (err) {
      console.log(err)
    }
  }

  handleColumns = e => {
    const showColumns = {...this.state.showColumns, [e.target.name]: !this.state.showColumns[e.target.name]}
    this.setState( {showColumns} )
  }

  render() {
    return (
      <>
        <div>
        <label class="checkbox">
          <input 
          name="task_name"
          checked={this.state.showColumns.task_name}      
          onClick={this.handleColumns}
          type="checkbox"/>
            task_name
          </label>

          <label class="checkbox">
          <input 
          name="status"
          checked={this.state.showColumns.status}
          onClick={this.handleColumns}
          type="checkbox"/>
            status
          </label>

          <label class="checkbox">
          <input 
          name="start_date"
          checked={this.state.showColumns.start_date}
          onClick={this.handleColumns}
          type="checkbox"/>
            start_date
          </label>

          <label class="checkbox">
          <input 
          name="end_date"
          checked={this.state.showColumns.end_date}
          onClick={this.handleColumns}
          type="checkbox"/>
            end_date
          </label>

          <label class="checkbox">
          <input 
          name="users"
          checked={this.state.showColumns.users}
          onClick={this.handleColumns}
          type="checkbox"/>
            users
          </label>

          <label class="checkbox">
          <input 
          name="delete"
          checked={this.state.showColumns.delete}
          onClick={this.handleColumns}
          type="checkbox"/>
            delete
          </label>
        </div>



        <h2 className="subtitle">Tasks</h2>
        {this.state.tasks.map((task, ind) => (
          <div key={task.id} className='box'>
            <div className="tile is-ancestor">
              <div className={`tile is-parent ${(!this.state.showColumns.task_name) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
                <input
                  className='input'
                  placeholder="Task Name"
                  name="task_name"
                  id={task.id}
                  value={this.state.tasks[ind].task_name}
                  onChange={this.handleChange}
                  onBlur={this.handleSubmit}
                />
              </article>
              </div>

              <div className={`tile is-parent ${(!this.state.showColumns.status) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
                <div className="select is-hover">
                  <select
                    type='date'
                    className='input'
                    placeholder="Date"
                    name="status"
                    id={task.id}
                    value={this.state.tasks[ind].status}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                  >
                    <option value='1'>Not Started</option>
                    <option value='2'>Working On It</option>
                    <option value='3'>Waiting For Review</option>
                    <option value='4'>Done</option>
                    <option value='5'>Need Help</option>
                    <option value='6'>Roadblocked</option>
                    <option value='7'>Iceboxed</option>
                  </select>
                </div>
              </article>
              </div>

              <div className={`tile is-parent ${(!this.state.showColumns.start_date) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
                <input
                    type='date'
                    className='input'
                    placeholder="Date"
                    name="start_date"
                    id={task.id}
                    value={this.state.tasks[ind].start_date}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                  />        
              </article>
              </div>

              <div className={`tile is-parent ${(!this.state.showColumns.end_date) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
                <input
                    type='date'
                    className='input'
                    placeholder="Date"
                    name="end_date"
                    id={task.id}
                    value={this.state.tasks[ind].end_date}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                  />        
              </article>
              </div>

              <div className={`tile is-parent ${(!this.state.showColumns.users) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
              <div className="select is-hover">
                  <select
                  
                    type='date'
                    className='input'
                    placeholder="Date"
                    name="users"
                    id={task.id}
                    value={this.state.tasks[ind].users[0]}
                    onChange={this.handleChange}
                    onBlur={this.handleSubmit}
                  >

                      <option value={null}>Not Assigned</option>            
                      {this.props.users.map(user => (
                      <option value={user.value}>{user.label}</option>
                    ))}
                  </select>
                </div>
              </article>
              </div>

              <div className={`tile is-parent ${(!this.state.showColumns.delete) ? 'is-hidden' : null}`}>
              <article className="tile is-child box">
                <button
                    className='button'
                    id={task.id}
                    onClick={this.handleDeleteTask}
                  >Delete Task</button>   
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
