import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import About from './About'
import Auth from '../../lib/auth'
import NewBoardButton from '../board/NewBoardButton'
import SmallBoardCard from '../board/SmallBoardCard'

class Home extends React.Component {
  state = {
    user: {
      board_owned: []
    },
    errors: ''
  }

  newSet = new Set(this.state.user.board_owned)

  async componentDidMount() {
    try {
      const res = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.setState({ user: res.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log(this.state)
    return (
      <>
        {!Auth.isAuthenticated() && <About />}
        {Auth.isAuthenticated() &&
          <section>
      <div>
        <div>
          <div className="container">
            <div className="columns is-mobile is-multiline">
          {Auth.isAuthenticated() && <NewBoardButton />}
            {this.state.user.board_owned.map(board => (
                <SmallBoardCard key={board.id} {...board} />
              )
            )
          }
          </div>
          </div>
          </div>
        </div>
      
    </section>
  }
      </>

    )
  }
}

export default Home
