import React, { useEffect, useState, useContext } from 'react'
import { withRouter } from 'react-router-native'

import { Linking, Image, TouchableWithoutFeedback, ActivityIndicator, FlatList } from 'react-native'
import { Container, Header, Content, SwipeRow, View, Text, Icon, Button } from 'native-base'

import AppContext from '../context/AppContext'

import app from 'firebase/app'
import { articlesDB } from '../lib/firebase'

const Review = ({ history }) => {
  const [load, setLoad] = useState(false)
  const valueContext = useContext(AppContext)
  const { articles, onReguestArticles } = valueContext

  const datas = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Alberto Moreno', 'Emre Can', 'Joe Allen', 'Phil Coutinho']

  // useEffect(() => {
  //   articles.length < 1 && onReguestArticles()
  // }, [articles])

  return (
    <Container>
      <Header />
      <Content scrollEnabled={false}>
        <SwipeRow
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button success onPress={() => alert('Add')}>
              <Icon active name="add" />
            </Button>
          }
          body={
            <View>
              <Text>SwipeRow Body Text</Text>
            </View>
          }
          right={
            <Button danger onPress={() => alert('Trash')}>
              <Icon active name="trash" />
            </Button>
          }
        />
      </Content>
    </Container>
  )
}

export default withRouter(Review)
