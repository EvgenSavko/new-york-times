import React from 'react'
import { View } from 'react-native'

const PrivateLayout = ({ children, match }) => {
  return <View>{React.cloneElement(children, match.params && match.params)}</View>
}

export default PrivateLayout

