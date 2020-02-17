import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'

const Loader = ({ style }) => {
  return (
    <View style={style ? style : [styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default Loader
