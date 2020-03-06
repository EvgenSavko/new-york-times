import React, { Fragment } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {primary, secondary} from '../../utils/theme'

const PublicLayout = ({ children, match, ...rest }) => {
  console.log('match',match)
  console.log('rest',rest)
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}><Text>Header</Text></View>
        <View style={styles.mainContent}>{React.cloneElement(children, match.params && match.params)}</View>
      </View>
      <View style={styles.footer}><Text>Footer</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mainContent: {
    display: 'flex',
    // flex: 4,
  },
  footer: {
    backgroundColor: secondary,
    // flex: 1,
    // position: 'absolute',
    // bottom: 0
  },
  header: {
    // flex: 1,
    backgroundColor: primary,
  }
})

export default PublicLayout

