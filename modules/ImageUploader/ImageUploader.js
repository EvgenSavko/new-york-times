import React, { useState, useEffect } from 'react'
import { Button, Image, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native'
import { Text, Container, Content } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const ImageUploader = () => {
  const [image, setImage] = useState(null)

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  useEffect(() => {
    getPermissionAsync()
  }, [])

  const renderImage = () => {
    if (image) {
      return (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )
    }
    return (
        <MaterialIcons style={styles.image} size={40} name="file-upload" color={'black'} />
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Container style={styles.container}>
         <TouchableHighlight style={styles.title} onPress={_pickImage}>
           <>
            <Text style={styles.text}>Change image</Text>
             {renderImage()}
           </>
          </TouchableHighlight>
      </Container>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 32,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  }
})

export default ImageUploader
