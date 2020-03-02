import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

const About = () => (
  <section>
    <div className="content">
      <div>
        <h1 className="title">About Skarpa</h1>
        <p>What is Skarpa? An effective, transparent platform for managing everything was desperately needed.</p>

        <p>The idea? Create a team management platform to connect people to workplace processes and existing tools, for companies of all sizes, across any industry. But don’t just make something that works --make a platform that people love to use.</p>

        <p>Skarpa was founded on the belief that transparency and collaboration create a culture of ownership and empowerment; more empowered teams are more productive. And we’re only scratching the surface of what we can accomplish together.</p>
        
        <p><Link to='/register'>Join Us Today</Link></p>
      </div>
    </div>
  </section>
)

export default About