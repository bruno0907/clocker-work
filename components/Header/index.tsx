import { Box } from '@chakra-ui/react'

export const Header = ({ children }) => {
  return (
    <Box mt={16} width="100%" display="flex" alignItems="center" justifyContent="space-between" p={4}>
      {children}
    </Box>
  )
}