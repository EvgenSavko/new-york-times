import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { withRouter } from 'react-router-native'

// import { onAuthStateChanged } from '../lib/firebase'
import app from 'firebase/app'

const Loading = ({ history }) => {
  useEffect(() => {
    // console.log('userLoading', onAuthStateChanged())

    app.auth().onAuthStateChanged(user => {
      user ? history.push('/main') : history.push('/login')
    })

    // onAuthStateChanged() ? history.push('/') : history.push('/login')
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
