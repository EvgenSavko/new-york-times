import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Form, Item, Input, Label } from 'native-base'
import app from 'firebase/app'
import { withRouter } from 'react-router-native'
import { ImageUploader } from '../modules';

const UserProfile = ({
  history
}) => {
  const [state, setState] = useState({ currentUser: null })
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    setState({ currentUser })
    setUserEmail(currentUser.email)
  }, [])
  return (
    <Container>
      <Form>
        <Item >
          <Label>Email</Label>
          <Input style={styles.input} value={userEmail} onChangeText={setUserEmail}/>
        </Item>
      </Form>
      <ImageUploader />
    </Container>
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
  }
})

export default withRouter(UserProfile)
