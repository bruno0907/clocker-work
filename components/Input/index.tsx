import { ChangeEvent } from 'react'

// @ts-ignore
import { mask, unMask } from 'remask'

import { 
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  Input as Inputbase,
  FormHelperText,  
} from '@chakra-ui/react'

import { PhoneIcon, EmailIcon } from '@chakra-ui/icons'

export const Input = ({ type, error, touched, label, onChange, mask: pattern, ...props }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target  
    
    const unMaskedValue = unMask(value)
    const maskedValue = mask(unMaskedValue, pattern)

    onChange && onChange(name)(maskedValue)
  }

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
        <Inputbase {...props} onChange={pattern ? handleChange : onChange} />    
      </InputGroup>
      {touched && <FormHelperText textColor="#E74C3C">{error}</FormHelperText>}          
    </FormControl>
  )
}