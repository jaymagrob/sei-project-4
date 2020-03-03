import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const Unauthorised = () => (
  <section>
    <div>
      <div>
        <h1 className="title">Unauthorised</h1>
        <p>Sorry but the page you are looking for doesn't exists.</p>
        <p><Link to='/'>Go back home</Link></p>
      </div>
    </div>
  </section>
)

export default Unauthorised