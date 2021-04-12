import React, { useState, useEffect, createContext, ReactNode } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'

import { firebaseClient, persistenceMode } from '../config/firebase/client'

interface IUserAuth{
  loading: boolean;
  user: {}
}

interface IAuthContext{
  userAuth: IUserAuth; 
  setUserAuth: any;
  signIn: ({ email, password }: IUser) => void;
  signUp: ({ email, password, username }: IUser) => void;  
  signOut: () => void;
}

interface IAuthProvider{
  children: ReactNode;
}

interface IUser{
  email: string;
  password: string;
  username?: string;
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({ children }: IAuthProvider) => {  
  const router = useRouter()

  const [userAuth, setUserAuth] = useState<IUserAuth>({
    loading: true,
    user: {}
  })

  const signIn = async ({ email, password }: IUser) => {
    firebaseClient.auth().setPersistence(persistenceMode)
  
    try {    
      await firebaseClient.auth().signInWithEmailAndPassword(email, password)
      router.push('/appointments')

      return firebaseClient.auth().currentUser

    } catch(error) {
      alert('Usuário ou senha inválidos')
      router.push('/sign-in')
    }
  }
  
  const signUp = async({ email, password, username }: IUser) => {
    try {
      await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
      const user = await signIn({ email, password })  
      
      const token = await user.getIdToken()

      await axios({
        method: 'POST',
        url: '/api/profile',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          username
        }
      })              
  
    } catch (error) {
      console.log(error)
    }
  }
  
  const signOut = async () => {
    await firebaseClient.auth().signOut()
    router.push('/')
  }

  useEffect(() => {
    const unsubscribe = firebaseClient.auth().onAuthStateChanged(user => {
      setUserAuth({
        loading: false,
        user
      })
    })

    return () => unsubscribe()
  }, [])

  return(
    <AuthContext.Provider value={{
        userAuth, 
        setUserAuth,
        signIn,
        signUp,
        signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}