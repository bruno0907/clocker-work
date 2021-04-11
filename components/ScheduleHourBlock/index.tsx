import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import { Input } from '..'

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
  useDisclosure
} from '@chakra-ui/react'

interface IScheduleData{
  name: string;
  phoneNumber: string;
  when: string  
}

interface IScheduleHourBlock{
  hour: string;
  date: Date;
}

export const ScheduleHourBlock = ({ hour, date }: IScheduleHourBlock) => {  
  const router = useRouter()  
  const { isOpen, onOpen, onClose } = useDisclosure()    

  const validationSchema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    phoneNumber: yup.string().required('Campo obrigatório')
  })

  const { values, handleChange, handleSubmit, errors, touched, handleBlur, resetForm, isSubmitting } = useFormik({
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

  const setSchedule = async (data: IScheduleData) => {
    const { username } = router.query    
    
    await axios({
      method: 'POST',
      url: 'api/schedule',      
      data: {
        ...data,
        username
      }
    })
    .then(response => {
      console.log(response)
      resetForm()
      onClose()      
      router.reload()
    }).catch(
      error => {
        console.log(error.message)  
        alert(`O horário das ${hour} já foi agendado. Tente outro horário.`) 
        resetForm()     
        onClose()
      }
    )
  }

  return(
    <>
      <Button p={8} colorScheme="blue" onClick={onOpen}>
        {hour}
      </Button>
      
      <Modal 
      isOpen={isOpen} 
      onClose={handleModalOnClose}      
    >
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>            
            <Button variant="outline" mr={3} onClick={handleModalOnClose}>Cancelar</Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Agendar horário
            </Button>            
          </ModalFooter>          
        </form>
      </ModalContent>
    </Modal>  
    </>
  )
}