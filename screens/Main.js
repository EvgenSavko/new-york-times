import React, { useEffect, useState, useContext } from 'react'
import { Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import ArticlesList from '../components/ArticlesList'

import app from 'firebase/app'

import AppContext from '../context/AppContext'

import { usersDB } from '../lib/firebase'

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

  return <ArticlesList articles={articles} onDelete={() => console.log('test')} onhandlerPress={handlerPress} />
}

export default withRouter(Main)
