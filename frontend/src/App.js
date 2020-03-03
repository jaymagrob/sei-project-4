import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import axios from 'axios'
import 'bulma';
import './App.css';
import Auth from './lib/auth'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Sidebar from './components/board/Sidebar'
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
import SecureRoute from './components/security/SecureRoute'
import UnSecureRoute from './components/security/UnsecureRoute'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        <section className="hero is-dark is-fullheight-with-navbar">          
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
