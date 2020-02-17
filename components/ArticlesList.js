import React, { useState, useCallback, useContext } from 'react'
import { StyleSheet, Image, Text, View, RefreshControl, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'
import Swipeout from 'react-native-swipeout'

import Loader from './Loader'

import AppContext from '../context/AppContext'

const ArticlesList = ({ articles, onhandlerPress, read, onDelete }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [show, setShow] = useState(true)
  const [loadDelete, setLoadDelete] = useState(true)
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
        {articles.map(item => {
          const { url, title, abstract, multimedia } = item
          const sw = read && {
            autoClose: true,
            right: [
              {
                text: 'Delete',
                backgroundColor: 'red',
                onPress: () => {
                  setLoadDelete(url)
                  onDelete(url)
                },
              },
            ],
          }
          return (
            <>
              <Swipeout {...sw} autoClose="true" backgroundColor="transparent">
                <TouchableWithoutFeedback
                  key={url}
                  onPress={() => onhandlerPress({ url, title, abstract, multimedia: [null, null, { url: multimedia[2].url }] })}
                >
                  <View style={read ? { ...styles.row, ...styles.read } : styles.row}>
                    {loadDelete === url && <Loader style={{ position: 'absolute', left: '48%', top: '40%' }} />}
                    <View style={{ width: '23%' }}>
                      <Image
                        style={{ flex: 1 }}
                        source={{
                          uri: multimedia[2].url,
                        }}
                      />
                    </View>
                    <View style={{ width: '77%', paddingLeft: 5 }}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.abstract}>{abstract}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Swipeout>
              <View style={{ height: 5 }} />
            </>
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
    paddingTop: 5,
    paddingBottom: 5,
  },
  row: {
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
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
