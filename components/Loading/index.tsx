import {
  Box,
  Spinner  
} from '@chakra-ui/react'

export const Loading = () => {
  return (
    <Box p={4} mt={8} alignItems="center" justifyContent="center">
      <Spinner 
        tickness="4px" 
        speed="0.65s" 
        emptyColor="gray.200" 
        color="blue.500" 
        size="xl"
      />
    </Box>
  )
}