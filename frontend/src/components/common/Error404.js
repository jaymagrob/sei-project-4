import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const Error404 = () => (
  <section className="is-fullheight-with-navbar hero section_padding">
    <div className="hero-body columns is-fullwidth has-text-centered	">
      <div className="column is-quarter-desktop"></div>
      <div className="column box has-background-info">
        <section className="section">
          <h1 className="title">Error 404</h1>
        </section>
        <section className="section">          
          <p>Sorry but the page you are looking for doesn't exists.</p>
        </section>
        <section className="section">          
        <p><Link to='/'><button className="button is-danger">Go back home</button></Link></p>
        </section>
      </div>
      <div className="column is-quarter-desktop"></div>
    </div>
  </section>

)
export default Error404