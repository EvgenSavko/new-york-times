import React, { useState, useCallback, useContext, useRef } from 'react'
import { StyleSheet, Image, Text, View, RefreshControl, Dimensions, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'

import Swipeable from 'react-native-swipeable'

import Loader from './Loader'

const ArticlesItem = ({ article, onhandlerPress, read, onDelete }) => {
  const [loadDelete, setLoadDelete] = useState(true)
  const { height, width } = Dimensions.get('screen')
  const swipeable = useRef(null)

  const { url, title, abstract, multimedia } = article
  const rightButtons = read && [
    <TouchableWithoutFeedback
      onPress={() => {
        handleDelete(url)
      }}
    >
      <View style={styles.cover_delete}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </View>
    </TouchableWithoutFeedback>,
  ]

  const handleDelete = url => {
    setLoadDelete(url)
    onDelete(url)
    swipeable && swipeable.current.recenter()
  }

  return (
    <View style={{ width }} key={url}>
      <Swipeable ref={swipeable} rightButtons={rightButtons} onSwipeStart={() => setTimeout(() => swipeable && swipeable.current.recenter(), 1700)}>
        <TouchableWithoutFeedback onPress={() => onhandlerPress({ url, title, abstract, multimedia: [null, null, { url: multimedia[2].url }] })}>
          <View style={read ? { ...styles.row, ...styles.read } : styles.row}>
            {loadDelete === url && <Loader style={{ position: 'absolute', left: '48%', top: '40%' }} />}
            <View style={{ width: (width / 100) * 23 }}>
              <Image
                style={{ flex: 1 }}
                source={{
                  uri: multimedia[2].url,
                }}
              />
            </View>
            <View style={{ width: (width / 100) * 77, paddingLeft: 5, paddingRight: 10, paddingBottom: 5 }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.abstract}>{abstract}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
      <View style={{ height: 5 }} />
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

export default ArticlesItem
