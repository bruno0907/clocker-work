import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Center, Spinner } from '@chakra-ui/react'

import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { userAuth } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if(!userAuth.loading){
      userAuth.user ? router.push('/schedule') : router.push('/sign-in')
    }
  }, [userAuth.user])
  
  return(    
    <Center height="100%" mt="calc(100vh - 50vh)">
      <Spinner />
    </Center>       
  )
  
}