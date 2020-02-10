import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import { withRouter } from 'react-router-native'

import app from 'firebase/app'

const Main = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    setState({ currentUser })
  }, [])

  const logOutHandler = () => {
    app
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out')
          history.push('/login')
        },
        error => {
          console.error('Sign Out Error', error)
        }
      )
  }

  return (
    state.currentUser && (
      <View style={styles.container}>
        <Button title="Log out" onPress={logOutHandler} />
        <Text>Hi {state.currentUser.email}!</Text>
      </View>
    )
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default withRouter(Main)
