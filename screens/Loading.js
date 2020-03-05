import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'

import app from 'firebase/app'

const Loading = ({ history }) => {
  useEffect(() => {
    app.auth().onAuthStateChanged(user => {
      user ? history.push('/dashboard') : history.push('/login')
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default withRouter(Loading)
