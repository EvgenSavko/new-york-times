import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { NativeRouter, Route } from 'react-router-native'

import Loading from './screens/Loading'
import SignUp from './screens/SignUp'
import Login from './screens/Login'
import Home from './screens/Home'

import { AppProvider } from './context/AppContext'

import { api } from './lib/api'
import './lib/firebase'

// import app from 'firebase/app'

const App: React.FC = () => {
  const [articles, setArticles] = useState([])

  const onReguestArticles = () => api().then(data => setArticles(data.results))

  // app.auth().signOut()
  return (
    <NativeRouter>
      <AppProvider value={{ articles, onReguestArticles }}>
        <>
          <View style={styles.nav}>
            {/* <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
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
            </Link> */}
          </View>
          <Route exact path="/" component={Loading} />
          <Route path="/sign_up" component={SignUp} />
          <Route path="/main" component={Home} />
          <Route path="/login" component={Login} />
        </>
      </AppProvider>
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
