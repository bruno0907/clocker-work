import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { addDays, subDays } from 'date-fns'

import axios from 'axios'

import { AuthContext } from '../../contexts/AuthContext'

import { Logo, Header, formatDate } from '../../components'

import { Container,   
  Text,
  Button,
  Box,
  IconButton,  
} from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { getToken } from '../../config/firebase/client'

export default function Appointments(){    
  const router = useRouter()
  const { userAuth, signOut } = useContext(AuthContext)
  const [appointments, setAppointments] = useState<[]>([])

  const [when, setWhen] = useState<Date>(() => new Date())  

  const nextDay = () => setWhen(prevState => addDays(prevState, 1))
  const previousDay = () => setWhen(prevState => subDays(prevState, 1))
  const currentDay = formatDate(when, 'PPPP')

  useEffect(() => {
    !userAuth.user && router.push('/')

    const getAppointments = async ( when: Date ) => { 
      const token = await getToken()
    
      const { data } = await axios({
        method: 'GET',
        url: '/api/appointments',
        params: { when },
        headers: { Authorization: `Bearer ${token}` },      
      })
      setAppointments(data)      
      
    }
    getAppointments(when)
    
  }, [userAuth.user, when])  
     
  return(
    <Container p={20} centerContent> 
      <Header>
        <Logo width="150" height="40"/>        
        <Button onClick={signOut}>Sair</Button>
      </Header>
      <Box mt={16} w="100%" display="flex" alignItems="center" justifyContent="space-between">     
        <IconButton 
          aria-label="previousDay" 
          icon={<ChevronLeftIcon />} 
          bg="transparen" 
          onClick={previousDay}
        />
        <Text>{currentDay}</Text>
        <IconButton 
          aria-label="nextDay" 
          icon={<ChevronRightIcon />} 
          bg="transparen"
          onClick={nextDay}
        />
      </Box>
      <Box mt={16}>
        <Text>
          Agenda
        </Text>
      </Box>
    </Container>     
  )
}
