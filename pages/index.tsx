import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Center } from '@chakra-ui/react'
import { Loading } from '../components'

import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
  const { userAuth } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if(!userAuth.loading){
      userAuth.user ? router.push('/appointments') : router.push('/sign-in')
    }
  }, [userAuth.user])
  
  return(    
    <Center height="100%" mt="calc(100vh - 62vh)">
      <Loading />
    </Center>       
  )
  
}