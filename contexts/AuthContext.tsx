import React, { useState, useEffect, createContext, ReactNode } from 'react'
import { useRouter } from 'next/router'
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
      router.push('/schedule')
    } catch(error) {
      console.log('SIGNIN ERROR: ', error)
    }
  }
  
  const signUp = async ({ email, password, username }: IUser) => {
    try {
      const { user } = await firebaseClient.auth().createUserWithEmailAndPassword(email, password)
      await signIn({ email, password })
      // setupProfile(token, username)
      console.log('Context SignUp User: ', user)
  
    } catch (error) {
      console.log('SIGNUP ERROR: ', error)
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

    return() => unsubscribe()
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