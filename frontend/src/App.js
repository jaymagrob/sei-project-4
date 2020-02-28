import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast'
import axios from 'axios'
import 'bulma';
import './App.css';


import Login from './components/auth/Login'
import Register from './components/auth/Register'
import SecureRoute from './components/security/SecureRoute'
import UnSecureRoute from './components/security/UnsecureRoute'

function App() {
  return (
    <BrowserRouter>
      <main>
        <div>HOLD FOR NAV</div>
        <div>HOLD FOR SIDE</div>
        <Switch>
          <UnSecureRoute path="/register" component={Register} />
          <UnSecureRoute path="/login" component={Login} />
        </Switch>
      </main>
    </BrowserRouter>    
  );
}

export default App;
