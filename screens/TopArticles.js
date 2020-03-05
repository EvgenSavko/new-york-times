import React, { useEffect, useState, useContext } from 'react'
import { withRouter } from 'react-router-native'

import { Linking, Image, TouchableWithoutFeedback } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base'

// import ArticlesList from '../components/ArticlesList'

import app from 'firebase/app'

import AppContext from '../context/AppContext'

import { usersDB, articlesDB } from '../lib/firebase'

const TopArticles = ({ history }) => {
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
    const docArticles = articlesDB.doc('selected')
    if (state.currentUser) {
      let arr = []
      docArticles.get().then(fieldArticles => {
        arr = [...fieldArticles.data().articles]
        if (arr.length === 0) {
          arr.push(obj)
        } else {
          if (getCoincidence(arr, obj)) arr.push(obj)
        }

        docArticles
          .update({
            articles: arr,
          })
          .then(function() {
            console.log('Updated')
          })
      })
    }
  }

  const getCoincidence = (arr, obj) => {
    let coincidence = true
    arr.forEach(item => (item.url === obj.url && coincidence ? (coincidence = false) : console.log('')))
    return coincidence
  }

  //   return <ArticlesList articles={articles} onDelete={() => console.log('test')} onhandlerPress={handlerPress} />
  return (
    <Container>
      <Content>
        {articles.length > 0 &&
          articles.map(item => {
            const { url, title, abstract, multimedia, created_date } = item
            return (
              <Card key={url} style={{ flex: 1 }}>
                <CardItem>
                  <Left>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
                      <Body>
                        <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                        <Text note>{created_date}</Text>
                      </Body>
                    </TouchableWithoutFeedback>
                  </Left>
                </CardItem>
                <CardItem>
                  <TouchableWithoutFeedback onPress={() => Linking.openURL(url)}>
                    <Body>
                      <Image source={{ uri: multimedia[0].url }} style={{ height: 200, width: '100%', flex: 1 }} />
                      <Text>{item.abstract}</Text>
                    </Body>
                  </TouchableWithoutFeedback>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button
                      warning
                      textStyle={{ color: '#87838B' }}
                      onPress={() =>
                        handlerPress({ url, title, abstract, multimedia: [{ url: multimedia[0].url }, null, { url: multimedia[2].url }] })
                      }
                    >
                      <Text>Add this article for users</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
            )
          })}
      </Content>
    </Container>
  )
}

export default withRouter(TopArticles)
