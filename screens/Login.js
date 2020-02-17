import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { withRouter } from 'react-router-native'

import { signIn } from '../lib/firebase'

const Login = ({ history }) => {
  const [state, setState] = useState({ email: '', password: '', errorMessage: null })

  const handleLogin = () => {
    // TODO: Firebase stuff...
    signIn(state.email, state.password)
      .then(() => history.push('/main/home'))
      .catch(error => setState({ ...state, errorMessage: error.message }))
    console.log('handleLogin', state)
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      {state.errorMessage && <Text style={{ color: 'red' }}>{state.errorMessage}</Text>}
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={email => setState({ ...state, email })}
        value={state.email}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={password => setState({ ...state, password })}
        value={state.password}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account? Sign Up" onPress={() => history.push('/sign_up')} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
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
  },
})

export default withRouter(Login)
