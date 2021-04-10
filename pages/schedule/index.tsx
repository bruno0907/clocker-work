import { useContext, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useFetch } from '@refetty/react'

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

// const getSchedule = async ( when: Date ) => { 
//   const token = await getToken()

//   return axios({
//     method: 'GET',
//     url: '/api/schedule',
//     params: { when },
//     headers: { Authorization: `Bearer ${token}` },      
//   })  
// }

export default function Schedule(){    
  const router = useRouter()
  const { userAuth, signOut } = useContext(AuthContext)

  const [when, setWhen] = useState<Date>(() => new Date())

  // const [data, { loading, status, error }, fetch] = useFetch(getSchedule(when), { lazy: true })

  const nextDay = () => setWhen(prevState => addDays(prevState, 1))
  const previousDay = () => setWhen(prevState => subDays(prevState, 1))
  const currentDay = formatDate(when, 'PPPP')

  useEffect(() => {
    !userAuth.user && router.push('/')

    const getSchedule = async ( when: Date ) => { 
      const token = await getToken()
    
      return axios({
        method: 'GET',
        url: '/api/schedule',
        params: { when },
        headers: { Authorization: `Bearer ${token}` },      
      })  
    }
    getSchedule(when)
    
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
