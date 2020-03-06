import React from 'react';
import { Route } from 'react-router-native';
import {
  PrivateRoute,
  PublicRoute,
  WithRole
} from '../../routes/index.js';

const RouteWithSubRoutes = ({
  status,
  component: Layout,
  allowedRoles = [],
  routes,
  children,
  path,
  ...rest
}) => {
  if (status === 'private') {
    return (
      <PrivateRoute
        path={path}
        component={
          allowedRoles.length
            ? WithRole({ allowedRoles, wrapper: Layout })
            : Layout
        }
        children={children}
        routes={routes}
        {...rest}
      />
    );
  }

  if (status === 'public') {
    return (
      <PublicRoute
        component={Layout}
        routes={routes}
        children={children}
        path={path}
        {...rest}
      />
    );
  }
  return (
    <Route
      path={path}
      render={props => {
        return (
          <Layout routes={routes} children={children} {...props} />
        );
      }}
      {...rest}
    />
  );
};

export default RouteWithSubRoutes;
