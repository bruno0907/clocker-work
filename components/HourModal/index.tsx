import { Input } from '../'

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
} from '@chakra-ui/react'

import { PhoneIcon, } from '@chakra-ui/icons'

import { useFormik } from 'formik'
import * as yup from 'yup'

export const HourModal = ({ isOpen, onClose, hour }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    phoneNumber: yup.string().required('Campo obrigatório')
  })

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      name: '',
      phoneNumber: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => console.log(values)
    
  })     

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Horário: {hour}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>              
              <Input
                type="text"
                label="Nome completo:"
                name="name"
                touched={touched.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                isRequired
              />
              <Input
                type="tel"
                label="Telefone de contato:"
                name="phoneNumber"
                touched={touched.phoneNumber}
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phoneNumber}
                isRequired
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" type="submit">
              Agendar horário
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>    
  )
  
}