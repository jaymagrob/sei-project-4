import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
      <section>
      <div>
        <div>
          <h1 className="title">Skarpa</h1>
          <p>Start your projects today!</p>      
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
      
    )
  }
}

export default Home
