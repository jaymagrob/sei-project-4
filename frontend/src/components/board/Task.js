import React from 'react'
import axios from 'axios'
import ImageUpload from '../common/ImageUpload'
import Auth from '../../lib/auth'
import Select from 'react-select'
import Sidebar from './Sidebar'
import BoardDetail from './BoardDetail'

const Task = ({ tasks = this.props}) => (
  <>
    {tasks.map(task => (
      <div key={task.id} className='box'>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">              
              <p class="subtitle">{task.task_name}</p>
            </article>
          </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="subtitle">{task.start_date}</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
          <p class="subtitle">{task.end_date}</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
          <p class="subtitle">{task.users}</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <div className="select is-hover">
              <select>
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
      </div>


      </div>
    ))}
    
  </>
)

export default Task