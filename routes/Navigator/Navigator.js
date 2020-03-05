import React from 'react';
import { Redirect, withRouter } from 'react-router-native';
import { RoutesList } from '../../routes';
import { useRole } from '../../hooks';
import Loading from '../../screens/Loading';

const Navigator = ({history}) => {
  // useEffect(() => {
  //   app.auth().onAuthStateChanged(user => {
  //     user ? history.push('/main/home') : history.push('/login')
  //   })
  // }, [])
  const role = useRole();
  if (role === '') {
    return <Loading />
  }
  if (role === 'member') {
    return <Redirect to={`${RoutesList.main}`} />;
  }
  // for admin role
  if (role === 'admin') {
    return <Redirect to={`${RoutesList.admin}`} />;
  }
  return <Redirect to={`${RoutesList.login}`} />;
};

export default withRouter(Navigator);
