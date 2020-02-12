import React from 'react'
import { StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native'

const ArticlesList = ({ articles, onhandlerPress, read }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        {articles.length > 0 &&
          articles.map(item => {
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
})

export default ArticlesList
