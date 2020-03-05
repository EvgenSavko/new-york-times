import React from 'react'
import { View } from 'react-native'

const Layout404 = ({ children, match }) => {
  return <View>{React.cloneElement(children, match.params && match.params)}</View>
}

export default Layout404
