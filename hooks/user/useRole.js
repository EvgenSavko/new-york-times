import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

const useRole = () => {
  const [role, setRole] = useState('')
  useEffect(async () => {
    try {
      const userRole = await AsyncStorage.getItem('role')
      if (userRole !== null) {
        setRole(userRole)
      }
    } catch (error) {
      console.log('getIsAuthorizedStatus error', error)
    }
  }, [])
  return role
}

export default useRole
