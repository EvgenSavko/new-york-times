import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { withRouter } from 'react-router-native'

import { signUp, usersDB } from '../lib/firebase'

const SignUp = ({ history }) => {
  const [state, setState] = useState({ email: '', password: '', errorMessage: null })

  handleSignUp = () => {
    // TODO: Firebase stuff...
    signUp(state.email, state.password)
      .then(data => {
        usersDB.doc(data.user.uid).set({
          uid: data.user.uid,
          email: state.email,
          articles: [],
        })
        history.push('/main/home')
      })
      .catch(error => setState({ ...state, errorMessage: error.message }))
  }

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      {state.errorMessage && <Text style={{ color: 'red' }}>{state.errorMessage}</Text>}
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => setState({ ...state, email })}
        value={state.email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setState({ ...state, password })}
        value={state.password}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Already have an account? Login" onPress={() => history.push('/login')} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // marginTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 5,
  },
})

export default withRouter(SignUp)
