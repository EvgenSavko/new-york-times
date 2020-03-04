import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import { Picker, Form } from 'native-base'

import { withRouter, Route } from 'react-router-native'

import Main from './Main'
import Read from './Read'

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

  return (
    <>
      <View style={styles.header}>
        <Button title="Log out" onPress={logOutHandler} />
      </View>
      {state.currentUser && (
        <View style={styles.container}>
          <View style={styles.control}>
            {history.location.pathname.indexOf('home') !== -1 && (
              <>
                <Text style={styles.title}>
                  Hello,{' '}
                  <Text style={{ fontStyle: 'italic' }}>
                    {state.currentUser.email}({state.currentUser.role})
                  </Text>{' '}
                  !
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Button title="Top articles" disabled />
                  <Button title="Read articles " onPress={() => history.push('/main/read')} />
                </View>
              </>
            )}
            {history.location.pathname.indexOf('read') !== -1 && (
              <>
                <Text style={styles.title}>My read articles !</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Button title="Top articles" onPress={() => history.push('/main/home')} />
                  <Button title="Read articles " disabled />
                </View>
              </>
            )}
          </View>
          <View style={styles.select}>
            {history.location.pathname.indexOf('home') !== -1 && (
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
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  control: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 15,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    // borderWidth: 1,
    // borderBottomColor: 'red',
    // marginBottom: 15,
  },
})

export default withRouter(Home)
