import { useContext } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from '../../contexts/AuthContext'

import { Logo } from '../../components'
import { Container,   
  Text,
  Button,
  Box,
} from '@chakra-ui/react'


export default function Schedule(){  
  const router = useRouter()  
  const { userAuth, signOut } = useContext(AuthContext)

  !userAuth.user && router.push('/')
      
  return(
    <Container p={20} centerContent> 
      <Logo />        
      <Text mt={16}>
        Agenda
      </Text>  
      <Box mt={16}>
        <Text>Items da agenda</Text>
      </Box>
      <Button mt={16} onClick={signOut}>Sair</Button>
    </Container>     
  )
}
