import {   
  Text,  
  Box,
  UnorderedList,
  ListItem  
} from '@chakra-ui/react'

export interface IAppointments{
  date: string;
  hour: string;
  name: string;
  phoneNumber: string;
  user_id: string;
}

export const AppointmentsList = ({ appointments }) => {
  return (
    <UnorderedList width="100%" spacing={4}>
      { appointments.map((appointment: IAppointments) => 
      <ListItem 
        key={appointment.hour} 
        paddingX={6} 
        paddingY={4} 
        listStyleType="none" 
        backgroundColor="gray.50" 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        borderRadius="6px"
      > 
        <Box flex={1}>
          <Text color="blue.500" fontSize={24} >{`${appointment.hour}h`}</Text>
        </Box>
        <Box textAlign="right" >
          <Text fontSize={20} fontWeight={'bold'}>{appointment.name}</Text>
          <Text fontSize={20} >{appointment.phoneNumber}</Text>
        </Box>
      </ListItem>)}
    </UnorderedList>
  )
}