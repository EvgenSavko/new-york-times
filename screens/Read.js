import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
import { withRouter } from 'react-router-native'

import app from 'firebase/app'
import { usersDB } from '../lib/firebase'
import { api } from '../lib/api'

const Read = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    setState({ currentUser })

    if (currentUser) {
      usersDB
        .doc(currentUser.uid)
        .get()
        .then(user => console.log('user', user.data()))
    }
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

  // console.log('state.currentUser', state.currentUser)

  console.log('articles', articles.length)

  return (
    state.currentUser && (
      <>
        <View style={styles.header}>
          <Button title="Log out" onPress={logOutHandler} />
        </View>
        <View style={styles.container}>
          <Text>My read articles!</Text>
          <Button title="Back" onPress={() => history.push('/main')} />
        </View>
      </>
    )
  )
}
const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  a: {
    color: 'rgb(0, 0, 238)',
    fontSize: 15,
  },
})

export default withRouter(Read)
