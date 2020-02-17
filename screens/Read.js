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
      usersDB
        .doc(currentUser.uid)
        .get()
        .then(user => setArticles(user.data().articles))
    }
  }, [])

  return <ArticlesList read={true} articles={articles} onhandlerPress={({ url }) => Linking.openURL(url)} />
}

export default withRouter(Read)
