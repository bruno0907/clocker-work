import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { addDays, subDays, format } from 'date-fns'

import axios from 'axios'

import { Logo, Header, formatDate, ScheduleHourBlock } from '../../components'

import { Container,   
  Text,
  Button,
  Box,
  IconButton,  
  SimpleGrid,
  Spinner  
} from '@chakra-ui/react'

import { ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

interface IAvailableHours{
  when: Date,
  username: string;
  result: [{
    hour: string;
    isBooked: boolean;
  }]
}

export default function Schedule(){    
  const router = useRouter()  
  const { username } = router.query

  const [when, setWhen] = useState<Date>(() => new Date())  
  const [availableHours, setAvailableHours] = useState<IAvailableHours>()  
  const [loading, setLoading] = useState(true)

  const previousDay = () => setWhen(prevState => subDays(prevState, 1))
  const nextDay = () => setWhen(prevState => addDays(prevState, 1))

  const currentDay = formatDate(when, 'PPPP')

  useEffect(() => { 
    if(!username) return 
    
    const getSchedule = async() => {
      setLoading(true)
      
      axios({
        method: 'GET',
        url: '/api/schedule',
        params: { 
          date: format(when, 'yyyy-MM-dd'), 
          username 
        },           
      }).then(({ data }) => {
        setAvailableHours(data)      
        setLoading(false)      
      }).catch(() => {      
        alert('Usuário não encontrado')
        router.push('/')
      })    
    }
    getSchedule()
    
  }, [when, username])    
  
  return(
    <Container centerContent p={10}> 
      <Header>
        <Logo width="150" height="40" />                
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
      { loading
        ? <Box p={4} mt={8} alignItems="center" justifyContent="center">
            <Spinner 
              tickness="4px" 
              speed="0.65s" 
              emptyColor="gray.200" 
              color="blue.500" 
              size="xl"
            />
          </Box>
        : <SimpleGrid mt={8} p={4} columns={2} gap={4} w="100%" alignItems="center" justifyContent="center">
            { availableHours.result.map(({ hour, isBooked }) => <ScheduleHourBlock key={hour} hour={hour} date={when} isBooked={isBooked}/>)}
          </SimpleGrid>
      }      
      <Box mt={8}>
        <Text>Copyright 2021 - Blabla</Text>
      </Box>     
    </Container>     
  )
}
