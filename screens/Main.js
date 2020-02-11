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

    // if (currentUser) {
    //   usersDB
    //     .doc(currentUser.uid)
    //     .get()
    //     .then(user => console.log('user', user.data()))
    // }
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

  const handlerPress = ({ url, title, abstract, multimedia }) => {
    const obj = { url, title, abstract, multimedia }
    const docUser = usersDB.doc(state.currentUser.uid)
    if (state.currentUser) {
      let arr = []
      docUser.get().then(user => {
        arr = [...user.data().articles]
        if (arr.length === 0) {
          arr.push(obj)
        } else {
          if (getCoincidence(arr, obj)) arr.push(obj)
        }

        docUser
          .update({
            articles: arr,
          })
          .then(function() {
            console.log('Updated')
          })
        Linking.openURL(url)
      })
    }
  }

  const getCoincidence = (arr, obj) => {
    let coincidence = true
    arr.forEach(item => (item.url === obj.url && coincidence ? (coincidence = false) : console.log('')))
    return coincidence
  }
  // console.log('state.currentUser', state.currentUser)

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
                articles.map(item => {
                  const { url, title, abstract, multimedia } = item
                  return (
                    <TouchableWithoutFeedback onPress={() => handlerPress({ url, title, abstract, multimedia: [null, null, multimedia[2].url] })}>
                      <View style={styles.row}>
                        <View style={{ width: '20%' }}>
                          <Image
                            style={{ flex: 1 }}
                            source={{
                              uri: multimedia[2].url,
                            }}
                          />
                        </View>
                        <View style={{ width: '80%', paddingLeft: 5 }}>
                          <Text style={styles.title}>{title}</Text>
                          <Text style={styles.abstract}>{abstract}</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                })}
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
