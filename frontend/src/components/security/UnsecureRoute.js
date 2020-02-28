import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../../lib/auth'

const UnSecureRoute = ({ component: Component, ...rest }) => {
  if (!Auth.isAuthenticated()) return <Route {...rest} component={Component}/>
  Auth.logout()
  return <Redirect to="/"/>
}

export default UnSecureRoute