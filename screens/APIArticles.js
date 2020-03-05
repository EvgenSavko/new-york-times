import React, { useEffect, useState, useContext } from 'react'
import { withRouter } from 'react-router-native'

import { Linking, Image, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base'

import AppContext from '../context/AppContext'

import app from 'firebase/app'
import { articlesDB } from '../lib/firebase'

const APIArticles = ({ history }) => {
  const [state, setState] = useState({ currentUser: null })
  const [load, setLoad] = useState(false)
  const valueContext = useContext(AppContext)
  const { articlesAPI, onReguestArticlesAPI } = valueContext

  useEffect(() => {
    articlesAPI.length < 1 && onReguestArticlesAPI()
  }, [articlesAPI])

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    setState({ currentUser })
  }, [])

  const handlerPress = ({ url, title, abstract, multimedia }) => {
    setLoad(true)
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
            setLoad(false)
          })
      })
    }
  }

  const getCoincidence = (arr, obj) => {
    let coincidence = true
    arr.forEach(item => (item.url === obj.url && coincidence ? (coincidence = false) : console.log('')))
    return coincidence
  }

  return (
    <Container>
      <Content>
        {articlesAPI.length === 0 && <ActivityIndicator style={{ marginTop: '50%' }} color={'black'} />}
        {articlesAPI.length > 0 &&
          articlesAPI.map(item => {
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
                      textStyle={{ color: '#87838B', position: 'relative' }}
                      onPress={() =>
                        handlerPress({ url, title, abstract, multimedia: [{ url: multimedia[0].url }, null, { url: multimedia[2].url }] })
                      }
                    >
                      <Text>Add this article for users</Text>
                      {load && <ActivityIndicator style={{ position: 'absolute', left: '50%' }} color={'black'} />}
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

export default withRouter(APIArticles)
