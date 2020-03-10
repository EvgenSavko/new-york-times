import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, View, Button, Text, ScrollView, } from 'react-native'
import { Container, Picker, Form } from 'native-base'
import { withRouter, Route } from 'react-router-native'
import { Header } from '../modules'
import Main from './Main'
import Read from './Read'
import APIArticles from './APIArticles'
import Review from './Review'
import Profile from './Profile'
import { Drawer } from '../modules'

import AppContext from '../context/AppContext'

import app from 'firebase/app'
import { usersDB } from '../lib/firebase'

function Home({ history }) {
  const [state, setState] = useState({ currentUser: null })
  const [selected, setSelected] = useState('Arts')
  const valueContext = useContext(AppContext)
  const { onChangeCategory } = valueContext

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    const docUser = usersDB.doc(currentUser.uid)
    docUser.get().then(user => setState({ currentUser: { ...currentUser, role: user.data().role } }))
  }, [])

  const logOutHandler = () => {
    app
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out')
          history.push('/login')
        },
        error => {
          console.error('Sign Out Error', error)
        }
      )
  }

  const onValueChange = value => {
    setSelected(value)
    onChangeCategory(value)
  }

  const drawerRef = useRef(null)
  const handleOpenDrawer = () => {
    console.log('dlick')
    if (drawerRef.current) {
      drawerRef.current._root.open()
    }
  }

  return (
    <Container>
      <Drawer ref={drawerRef} currentUser={state.currentUser}>
        <Header handleOpenDrawer={handleOpenDrawer} history={history} currentUser={state.currentUser} />
        {
          state.currentUser && (
            <>
              <View style={styles.select}>
                {(history.location.pathname.indexOf('home') !== -1 || history.location.pathname.indexOf('api_articles') !== -1) &&
                state.currentUser.role === 'admin' && (
                  <>
                    <Text>Select category: </Text>
                    <Form>
                      <Picker
                        mode="dropdown"
                        placeholder="Select One"
                        placeholderStyle={{ color: '#2874F0' }}
                        textStyle={{ color: '#2874F0', fontWeight: '500' }}
                        note={false}
                        selectedValue={selected}
                        onValueChange={onValueChange}
                      >
                        <Picker.Item label="Arts" value="Arts" />
                        <Picker.Item label="Home" value="Home" />
                        <Picker.Item label="Science" value="Science" />
                        <Picker.Item label="Us" value="Us" />
                        <Picker.Item label="World" value="World" />
                      </Picker>
                    </Form>
                  </>
                )}
              </View>
              <Route path="/main/home" component={Main} />
              <Route path="/main/read" component={Read} />
              <Route path="/main/api_articles" component={APIArticles} />
              <Route path="/main/review" component={Review} />
              <Route path="/main/profile" component={Profile} />
            </>
          )
        }
      </Drawer>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    // display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: 10,
    height: 100,
    // width: '100%',
    // backgroundColor: 'red'
  },
})

export default withRouter(Home)
