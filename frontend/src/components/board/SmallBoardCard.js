import React from 'react'
import { Link } from 'react-router-dom'

const  SmallBoardCard = ({image, board_name, description, id}) => (
    <div key={id} className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <Link to={`/project/${id}`}>
      <div className="card">
        <div className="card-header">
          <h4 className="card-header-title">{board_name}</h4>
        </div>
        <div className="card-content">
          <h5 className="title is-6">{description}</h5>
        </div>
      </div>
    </Link>
    </div>
  

)
export default SmallBoardCard

