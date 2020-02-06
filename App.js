import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { NativeRouter, Route, Link } from 'react-router-native'

import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Main from './screens/Main'

function App() {
  return (
    <NativeRouter>
      <>
        <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>loading</Text>
          </Link>
          <Link to="/sign_up" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>sign_up</Text>
          </Link>
          <Link to="/login" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>login</Text>
          </Link>
          <Link to="/main" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>main</Text>
          </Link>
        </View>

        <Route exact path="/" component={Loading} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={Main} />
      </>
    </NativeRouter>
  )
}

const styles = StyleSheet.create({
  nav: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
})

export default App
