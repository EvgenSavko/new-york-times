import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import ArticlesList from '../components/ArticlesList'

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
        .then(user => setArticles(user.data().articles))
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

  console.log('articles', articles[1])

  return (
    state.currentUser && (
      <>
        <View style={styles.header}>
          <Button title="Log out" onPress={logOutHandler} />
        </View>
        <View style={styles.container}>
          <Text>My read articles!</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Top articles" style={{ borderColo: 'red' }} onPress={() => history.push('/main')} />
            <Button title="Read articles " onPress={() => history.push('/read')} />
          </View>
          <ArticlesList read={true} articles={articles} onhandlerPress={({ url }) => Linking.openURL(url)} />
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
