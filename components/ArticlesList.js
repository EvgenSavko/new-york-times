import React, { useState, useCallback, useContext, useEffect } from 'react'
import { StyleSheet, Image, Text, View, RefreshControl, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'

import Loader from './Loader'

import AppContext from '../context/AppContext'

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

const ArticlesList = ({ articles, onhandlerPress, read }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState(true)
  const valueContext = useContext(AppContext)
  const { onReguestArticles } = valueContext

  useEffect(() => {
    wait(2500).then(() => setShow(false))
  }, [])

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
        {articles.map(item => {
          const { url, title, abstract, multimedia } = item
          return (
            <TouchableWithoutFeedback
              key={url}
              onPress={() => onhandlerPress({ url, title, abstract, multimedia: [null, null, { url: multimedia[2].url }] })}
            >
              <View style={read ? { ...styles.row, ...styles.read } : styles.row}>
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
