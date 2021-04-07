import { Logo } from '..'
import { Container,   
  Text,
  Button 
} from '@chakra-ui/react'

import { firebaseClient } from '../../config/firebase/client'

export const Schedule = () => {
  const handleLogout = () => firebaseClient.auth().signOut()

  return(
    <Container p={20} centerContent>      
      <Logo />
      
      <Text mt={16}>
        Agenda
      </Text>      

      <Button mt={16} onClick={handleLogout}>Sair</Button>
    </Container>
  )
}