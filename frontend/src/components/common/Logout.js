import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const Logout = () => (
  <section>
    <div>
      <div>
        <h1 className="title">You have logged out!</h1>
        <p>To log back in click below.</p>
        <p><Link to='/login'>Go back home</Link></p>
      </div>
    </div>
  </section>
)

export default Logout