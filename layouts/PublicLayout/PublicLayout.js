import React from 'react'
import { View } from 'react-native'

const PublicLayout = ({ children, match }) => {
  return <View>{React.cloneElement(children, match.params && match.params)}</View>
}

export default PublicLayout

