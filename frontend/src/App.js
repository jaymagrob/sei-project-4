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
import Sidebar from './components/common/Sidebar'
import Error404 from './components/common/Error404'
import Navbar from './components/common/Nav'
import Profile from './components/user/Profile'
import ProfileEdit from './components/user/ProfileEdit'
import SecureRoute from './components/security/SecureRoute'
import UnSecureRoute from './components/security/UnsecureRoute'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Navbar />
        {/* <Sidebar /> */}
        <Switch>
          <Route path="/profile/edit" component={ProfileEdit} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/*" component={Error404} />
        </Switch>
      </main>
    </BrowserRouter>    
  );
}

export default App;
