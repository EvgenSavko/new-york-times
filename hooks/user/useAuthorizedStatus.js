import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

const useAuthorizedStatus = () => {
  const [isAuthorized, setIsAuthorized] = useState('')
  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('isAuthorized')
      if (value !== null) {
        setIsAuthorized(value)
      }
    } catch (error) {
      console.log('getIsAuthorizedStatus error', error)
    }
  }, [])
  return isAuthorized
}

export default useAuthorizedStatus
