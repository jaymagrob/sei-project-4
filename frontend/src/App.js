import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import 'cool-checkboxes-for-bulma.io'
import './sass/main.scss'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import NewBoard from './components/board/NewBoard'
import Board from './components/board/Board'
import Error404 from './components/common/Error404'
import Unauthorised from './components/common/Unauthorised'
import Logout from './components/common/Logout'
import Navbar from './components/common/Nav'
import About from './components/common/About'
import Home from './components/common/Home'
import Profile from './components/user/Profile'
import ProfileEdit from './components/user/ProfileEdit'


function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <section className="hero is-primary is-fullheight-with-navbar">          
            <div className="columns">                                        
              <div className="column">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/project/new" component={NewBoard} />
                  <Route path="/project/:id" component={Board} />
                  <Route path="/profile/edit" component={ProfileEdit} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/about" component={About} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/unauthorised" component={Unauthorised} />
                  <Route path="/*" component={Error404} />
                </Switch>
              </div>
            </div>
        </section>
      </main>
    </BrowserRouter>    
  );
}

export default App;
