import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const Logout = () => (
<section className="is-fullheight-with-navbar hero section_padding">
<div className="hero-body columns is-fullwidth has-text-centered	">
  <div className="column is-quarter-desktop"></div>
  <div className="column box has-background-info">
    <section className="section">
      <h1 className="title">Your have logged out!</h1>
    </section>
    <section className="section">          
      <p>To log back in click below.</p>
    </section>
    <section className="section">          
    <p><Link to='/login'><button className="button is-warning is-fullwidth">Login</button></Link></p>
    </section>


  </div>
  <div className="column is-quarter-desktop"></div>
</div>
</section>
)

export default Logout