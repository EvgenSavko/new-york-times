import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import ArticlesList from '../components/ArticlesList'

import app from 'firebase/app'

import { usersDB } from '../lib/firebase'

const Read = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    setState({ currentUser })

    if (currentUser) {
      getArticlesUser(currentUser.uid)
      // usersDB
      //   .doc(currentUser.uid)
      //   .get()
      //   .then(user => setArticles(user.data().articles))
    }
  }, [])

  const handleDeleteArticle = url => {
    usersDB
      .doc(state.currentUser.uid)
      .update({
        articles: articles.filter(item => item.url !== url),
      })
      .then(() => getArticlesUser(state.currentUser.uid))
  }

  const getArticlesUser = uid => {
    usersDB
      .doc(uid)
      .get()
      .then(user => setArticles(user.data().articles))
  }
  return <ArticlesList read={true} articles={articles} onDelete={handleDeleteArticle} onhandlerPress={({ url }) => Linking.openURL(url)} />
}

export default withRouter(Read)
