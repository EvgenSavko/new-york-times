import React from 'react';
import { Redirect } from 'react-router-native';
import { useRole } from '../../hooks';

// Role authorization HOC
const WithRole = ({
    allowedRoles,
    wrapper: WrappedComponent
  }) => {
  const userRole = useRole();
  if (userRole === '') {
    return null;
  }
  if (
    userRole !== null &&
    allowedRoles.length &&
    allowedRoles.includes(userRole)
  ) {
    return WrappedComponent;
  }
  return <Redirect to={'/'} />;
};

export default WithRole;
