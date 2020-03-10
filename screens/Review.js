import React, { useEffect, useState, useContext } from 'react'
import { Linking } from 'react-native'
import { withRouter } from 'react-router-native'

import ArticlesList from '../components/ArticlesList'

import AppContext from '../context/AppContext'

import app from 'firebase/app'
import { articlesDB } from '../lib/firebase'

const Review = ({ history }) => {
  const valueContext = useContext(AppContext)
  const { articles, onReguestArticles } = valueContext

  useEffect(() => {
    articles.length < 1 && onReguestArticles()
  }, [articles])

  const handleDeleteArticle = url => {
    articlesDB
      .doc('selected')
      .update({
        articles: articles.filter(item => item.url !== url),
      })
      .then(() => onReguestArticles())
  }

  return <ArticlesList read={true} articles={articles} onDelete={handleDeleteArticle} onhandlerPress={({ url }) => Linking.openURL(url)} />
}

export default withRouter(Review)
