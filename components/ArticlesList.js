import React, { useState, useCallback, useContext } from 'react'
import { StyleSheet, Image, Text, View, RefreshControl, SafeAreaView, ScrollView } from 'react-native'

import Loader from './Loader'

import AppContext from '../context/AppContext'
import ArticleItem from './ArticleItem'

const ArticlesList = props => {
  const { articles, read } = props
  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState(true)
  const valueContext = useContext(AppContext)
  const { onReguestArticles } = valueContext

  setTimeout(() => setShow(false), 2000)

  const onRefresh = useCallback(() => {
    if (!read) {
      setRefreshing(true)
      onReguestArticles().then(() => setRefreshing(false))
    } else {
      setRefreshing(false)
    }
  }, [refreshing])

  return articles.length > 0 ? (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          {articles.map(item => {
            return <ArticleItem article={item} {...props} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : show ? (
    <Loader />
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={styles.title}> You did not read any article </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  },
  cover_delete: {
    backgroundColor: 'red',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '5%',
  },
  row: {
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 3,
    paddingRight: 5,
    backgroundColor: '#e9e9e936',
    flexDirection: 'row',
  },
  read: {
    borderWidth: 2,
    borderColor: '#dde4ff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})

export default ArticlesList
