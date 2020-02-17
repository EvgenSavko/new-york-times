import React from 'react'
import { StyleSheet, View, Button } from 'react-native'

import { withRouter, Route } from 'react-router-native'

import Main from './Main'
import Read from './Read'

import app from 'firebase/app'

function Home({ history }) {
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
    <>
      <View style={styles.header}>
        <Button title="Log out" onPress={logOutHandler} />
      </View>
      <Route path="/main/home" component={Main} />
      <Route path="/main/read" component={Read} />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
})

export default withRouter(Home)
