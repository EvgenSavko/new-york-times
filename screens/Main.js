import React, { useEffect, useState } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, SafeAreaView, ScrollView, TouchableWithoutFeedback, Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import app from 'firebase/app'
import { usersDB } from '../lib/firebase'
import { api } from '../lib/api'

const Main = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })
  const [articles, setArticles] = useState([])

  useEffect(() => {
    api().then(data => setArticles(data.results))
  }, [setArticles])

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

  const handlerPress = url => {
    console.log('press', url)
    Linking.openURL(url)
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
          <Text>Hi {state.currentUser.email}!</Text>
          <Button title="Articles that I have read!" onPress={() => history.push('/read')} />
          <SafeAreaView>
            <ScrollView>
              {articles.length > 0 &&
                articles.map(item => (
                  <TouchableWithoutFeedback onPress={() => handlerPress(item.url)}>
                    <View style={styles.row}>
                      <View style={{ width: '20%' }}>
                        <Image
                          style={{ flex: 1 }}
                          source={{
                            uri: item.multimedia[2].url,
                          }}
                        />
                      </View>
                      <View style={{ width: '80%', paddingLeft: 5 }}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.abstract}>{item.abstract}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
            </ScrollView>
          </SafeAreaView>
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
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  row: {
    marginBottom: 8,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#efefefa6',
    flexDirection: 'row',
  },
})

export default withRouter(Main)
