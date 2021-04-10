import { Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,   
  Stack,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  Input as Inputbase,
  FormHelperText,  
} from '@chakra-ui/react'

import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'

export const Input = ({ type, error, touched, label, ...props }) => {
  return(
    <FormControl id={props.name} isRequired={props.isRequired}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        { type === 'tel' && 
          <InputLeftElement
            pointerEvents="none"
            children={<PhoneIcon color="gray.300" />}
          />
        }
        { type === 'email' && 
          <InputLeftElement
            pointerEvents="none"
            children={<EmailIcon color="gray.300" />}
          />
        }
        <Inputbase {...props} />    
      </InputGroup>
      {touched && <FormHelperText textColor="#E74C3C">{error}</FormHelperText>}          
    </FormControl>
  )
}