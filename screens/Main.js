import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import ArticlesList from '../components/ArticlesList'

import app from 'firebase/app'

import AppContext from '../context/AppContext'

import { usersDB } from '../lib/firebase'
// import { api } from '../lib/api'

const Main = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })
  const valueContext = useContext(AppContext)
  const { articles, onReguestArticles } = valueContext

  useEffect(() => {
    articles.length < 1 && onReguestArticles()
  }, [articles])

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

  console.log('articles', articles.length)

  return (
    state.currentUser && (
      <>
        <View style={styles.header}>
          <Button title="Log out" onPress={logOutHandler} />
        </View>
        <View style={styles.container}>
          <Text>Hi {state.currentUser.email}!</Text>
          <View style={{ flexDirection: 'row' }}>
            <Button title="Top articles" onPress={() => history.push('/main')} />
            <Button title="Read articles " onPress={() => history.push('/read')} />
          </View>
          <ArticlesList articles={articles} onhandlerPress={handlerPress} />
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
