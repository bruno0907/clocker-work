import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'

import { addDays, subDays } from 'date-fns'

import axios from 'axios'

import { Logo, Header, formatDate, HourButton } from '../../components'

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
  timeBlocks: [string]
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

    axios({
      method: 'GET',
      url: '/api/schedule',
      params: { 
        when, 
        username 
      },           
    })
    .then(({ data }) => {
      setAvailableHours(data)      
      setLoading(false)      
    })
    .catch(error => console.log(error.message))    
    
  }, [when, username])  
     
  return(
    <Container centerContent p={10}> 
      <Header>
        <Logo width="150" height="40"/>        
        <Button onClick={() => router.push('/')}>Sair</Button>
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
        ? <Box p={4} alignItems="center" justifyContent="center">
            <Spinner 
              tickness="4px" 
              speed="0.65s" 
              emptyColor="gray.200" 
              color="blue.500" 
              size="xl"
            />
          </Box>
        : <SimpleGrid p={4} columns={2} gap={4} w="100%" alignItems="center" justifyContent="center">
            { availableHours?.timeBlocks.map(hour => <HourButton key={hour} hour={hour} />)}
          </SimpleGrid> 
      }           
    </Container>     
  )
}
