import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Container, Text, Form, Item, Input, Label, Button, Content } from 'native-base'
import app from 'firebase/app'
import { withRouter } from 'react-router-native'
import { ImageUploader } from '../modules';
import { usersDB } from '../lib/firebase'

const UserProfile = ({
  history
}) => {
  const [user, setUser] = useState({
    uid: null,
    name: '',
    image: '',
  })

  useEffect(() => {
    const { currentUser } = app.auth()
    if (!currentUser) history.push('/login')
    const docUser = usersDB.doc(currentUser.uid)
    docUser.get()
      .then(user => {
      setUser({
        uid: currentUser.uid,
        name: user.data().name,
        image: user.data().image,
      })
    })
      .catch(err => {
        console.log('get user err',err)
      })
  }, [])

  const handleSaveUserData = () => {
    if (user.uid) {
      const docUser = usersDB.doc(user.uid);
      docUser.update({
        image: user.image,
        name: user.name
      })
        .then(data => {
          console.log('save success')
        })
        .catch(err => {
          console.log('save error',err)
        })
    }
  }

  return (
    <Container>
      <Form>
        <Item >
          <Label>Name</Label>
          <Input style={styles.input} value={user.name} onChangeText={name => setUser(state => ({
            ...state,
            name
          }))}/>
        </Item>
      </Form>
      <ImageUploader
        handleChangeImage={image => setUser(state => ({
          ...state,
          image
        }))}
        image={user.image}
      />
      {user.image ? (
        <View style={styles.successContainer}>
          <Button success onPress={handleSaveUserData}><Text>Save changes</Text></Button>
        </View>
      ) : null}
    </Container>
  )
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'left',
  },
  successContainer: {
    marginTop: 40,
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 40,
  }
})

export default withRouter(UserProfile)
