import React from 'react'
import { Link } from 'react-router-dom'

const About = () => (

<section className="is-fullheight-with-navbar hero section_padding">
<div className="hero-body columns is-fullwidth has-text-centered	">
  <div className="column is-quarter-desktop"></div>
  <div className="column box has-background-info">
    <section className="section">
      <h1 className="title">About Skarpa</h1>
      <section className="section">
        <p>What is Skarpa? An effective, transparent platform for managing everything was desperately needed.</p>
        <p>The idea? Create a team management platform to connect people to workplace processes and existing tools, for companies of all sizes, across any industry. But don’t just make something that works --make a platform that people love to use.</p>
        <p>Skarpa was founded on the belief that transparency and collaboration create a culture of ownership and empowerment; more empowered teams are more productive. And we’re only scratching the surface of what we can accomplish together.</p>        
      </section>
      <p><Link to='/register'><button className="button is-warning">Join Us Today</button></Link></p>
    </section>
  </div>
  <div className="column is-quarter-desktop"></div>
</div>
</section>
)

export default About



