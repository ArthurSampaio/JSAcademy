import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthService } from './../../services/Auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = AuthService.currentUserValue
      if (!currentUser) {
        console.log('Ta logado nao mestre')

        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
      return <Component {...props} />
    }}
  />
)

export default PrivateRoute
