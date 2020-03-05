import React from 'react'
import { Route, Redirect } from 'react-router-native'
import { useAuthorizedStatus } from '../../hooks'

const PublicRoute = ({ component: Component, children, path, routes }) => {
  const isAuthorizedStatus = useAuthorizedStatus()
  if (isAuthorizedStatus === null) {
    return null
  }
  return (
    <Route
      path={path}
      render={props => {
        return isAuthorizedStatus === 'true' ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} path={path} routes={routes} children={children} />
        )
      }}
    />
  )
}

export default PublicRoute
