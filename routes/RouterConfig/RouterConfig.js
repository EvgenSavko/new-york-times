import React from 'react'
import { Redirect } from 'react-router-native'
import RoutesList from '../RoutesList'
// import Navigator from '../Navigator';
import Loading from '../../screens/Loading'
import Home from '../../screens/Home'
import Login from '../../screens/Login'
import { Page404 } from '../../screens'
import { Layout404, PublicLayout, PrivateLayout } from '../../layouts'

const RouterConfig = () => {
  return {
    routes: [
      {
        path: `${RoutesList.dashboard}`,
        exact: true,
        component: PrivateLayout,
        children: <Home />,
        status: 'default',
      },
      {
        path: `${RoutesList.login}`,
        exact: true,
        component: PublicLayout,
        children: <Login />,
        status: 'default',
      },
      {
        path: `${RoutesList.page404}`,
        exact: true,
        component: Layout404,
        children: <Page404 />,
        status: 'default',
      },
      {
        path: `${RoutesList.splash}`,
        exact: true,
        component: PublicLayout,
        children: <Loading />,
        status: 'default',
      },
    ],
    noRouteFound: <Redirect from={'*'} to={`${RoutesList.page404}`} />,
  }
}

export default RouterConfig
