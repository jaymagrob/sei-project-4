import React from 'react'
import { Link } from 'react-router-dom'

const NewBoardButton = () => (
<div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
<Link to={`/project/new`}>
  <div className="card">
    <div className="card-header">
      <h4 className="card-header-title">CREATE A NEW BOARD</h4>
    </div>
    <div className="card-content">
      <h5 className="card-text title is-6 has-text-dark">Click here and create add a new board to this section</h5>
    </div>
  </div>
</Link>
</div>

)
export default NewBoardButton