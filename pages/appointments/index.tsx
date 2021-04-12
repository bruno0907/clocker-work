import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { addDays, subDays, format } from 'date-fns'

import axios from 'axios'

import { AuthContext } from '../../contexts/AuthContext'

import { 
  Logo, 
  Header, 
  formatDate, 
  AppointmentsList, 
  Loading 
} from '../../components'

import { 
  Container,   
  Text,
  Button,
  Box,
  IconButton, 
} from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { getToken } from '../../config/firebase/client'

import { IAppointments } from '../../components'

export default function Appointments(){    
  const router = useRouter()

  const { userAuth, signOut } = useContext(AuthContext)

  const [appointments, setAppointments] = useState<IAppointments[]>()
  const [when, setWhen] = useState<Date>(() => new Date())  
  const [loading, setLoading] = useState(true)
  
  const previousDay = () => setWhen(prevState => subDays(prevState, 1))
  const nextDay = () => setWhen(prevState => addDays(prevState, 1))

  const currentDay = formatDate(when, 'PPPP')  

  useEffect(() => {
    !userAuth.user && router.push('/')     
    
    const getAppointments = async() => {
      const token = await getToken()
      
      setLoading(true)

      axios({
        method: 'GET',
        url: '/api/appointments',
        params: { date: format(when, 'yyyy-MM-dd') },
        headers: { Authorization: `Bearer ${token}` },      
      }).then(({ data }) => {
        setAppointments(data)
        setLoading(false)
      })
      .catch(() => {})
      
    }
    getAppointments()      

    return(() => setAppointments([]))

  }, [when])  
     
  return(
    <Container p={20} centerContent maxW="container.md"> 
      <Container>
        <Header>
          <Logo width="150" height="40"/>        
          <Button onClick={signOut}>Sair</Button>
        </Header>
      </Container>
      <Container mt={16} display="flex" alignItems="center" justifyContent="space-between">     
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
      </Container>
      <Box mt={16} w="100%" display="flex" alignItems="center" justifyContent="center">
      { loading
        ? <Loading />
        : <AppointmentsList appointments={appointments} />
      }      
      </Box>
    </Container>     
  )
}
