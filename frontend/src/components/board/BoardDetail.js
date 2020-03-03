import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'
import Select from 'react-select'
import Task from './Task'

const BoardDetail = ({ boardId, tasks, users, handleMultiChange, board, handleChange, handleSubmit, defaultUser = this.props}) => (
  <section>
    {console.log('HI',defaultUser)}
    <div className="control">
      <input
        className='input'
        placeholder="Board Name"
        name="board_name"
        value={board.board_name}
        onChange={handleChange}
        onBlur={handleSubmit}
      />
    </div>
    <div className="control">
      <input
        className='input'
        placeholder="Description"
        name="description"
        value={board.description}
        onChange={handleChange}
        onBlur={handleSubmit}
      />
    </div>
    <div className="control">
      <input
        type='number'
        className='input'
        placeholder="Budget"
        name="budget"
        value={board.budget}
        onChange={handleChange}
        onBlur={handleSubmit}
      />
    </div>
    <div className="field">
      <label className="form-fields">Users</label>
      <div className="control">        
        <Select
          options={users}
          value={defaultUser}        
          isMulti          
          onChange={(e) => handleMultiChange(e)}
          onBlur={handleSubmit}
        />
      </div>
    </div>

    <Task
      boardId={boardId}
    />

  </section>
)

export default BoardDetail