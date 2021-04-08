import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { Logo } from '../../components'
import { Container,   
  Text,
  Button 
} from '@chakra-ui/react'

export const Schedule = () => {
  const { signOut } = useContext(AuthContext)

  return(
    <Container p={20} centerContent>      
      <Logo />
      
      <Text mt={16}>
        Agenda
      </Text>      

      <Button mt={16} onClick={signOut}>Sair</Button>
    </Container>
  )
}