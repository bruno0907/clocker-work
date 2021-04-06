import { useEffect, useState } from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import { Login, Appointments } from '../components'

import firebase from './../config/firebase'

export default function Home() {
  const [userAuth, setUserAuth] = useState({
    loading: true,
    user: {}
  })

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUserAuth({
        loading: false,
        user
      })
    })
  }, [])

  if(userAuth.loading){
    return (
    <Center height="100%" mt="calc(100vh - 50vh)">
      <Spinner />
    </Center>
  )}

  return userAuth.user 
    ? <Appointments /> 
    : <Login />      
}