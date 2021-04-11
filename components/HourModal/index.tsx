import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import { Input } from '../'

import { 
  Button,   
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,   
  Stack,    
} from '@chakra-ui/react'

interface ISchedule{
  name: string;
  phoneNumber: string;
  when: string
}

export const HourModal = ({ isOpen, onClose, hour }) => {
  const router = useRouter()  
  
  const setSchedule = async (data: ISchedule) => {
    const { username } = router.query    
    
    await axios({
      method: 'POST',
      url: 'api/schedule',      
      data: {
        ...data,
        username
      }
    })
    .then(() => {
      resetForm()
      onClose()
    }).catch(error => console.log(error.message))
  }


  const validationSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    phoneNumber: yup.string().required('Campo obrigatório')
  })

  const { values, handleChange, handleSubmit, errors, touched, handleBlur, resetForm,  } = useFormik({
    initialValues: {
      name: '',
      phoneNumber: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => setSchedule({ ...values, when: hour }),
    
  })     

  const handleModalOnClose = () => {
    resetForm()
    return onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleModalOnClose}>
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
            <Button variant="outline" mr={3} onClick={handleModalOnClose}>Cancelar</Button>
            <Button colorScheme="blue" type="submit">
              Agendar horário
            </Button>            
          </ModalFooter>          
        </form>
      </ModalContent>
    </Modal>    
  )  
}