import React from 'react'
import { Route, Redirect } from 'react-router-native'
import { useAuthorizedStatus } from '../../hooks'

const PrivateRoute = ({ component: Component, children, path, routes }) => {
  const isAuthorizedStatus = useAuthorizedStatus()
  console.log('isAuthorizedStatus',isAuthorizedStatus)
  if (isAuthorizedStatus === null) {
    return null;
  }
  return (
    <Route
      path={path}
      render={props => {
        return isAuthorizedStatus === 'true' ? (
          <Component routes={routes} match={props.match} children={children} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

export default PrivateRoute
