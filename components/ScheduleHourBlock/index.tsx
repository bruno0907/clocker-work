import { useRouter } from 'next/router'

import { useFormik } from 'formik'
import * as yup from 'yup'

import axios from 'axios'

import { format } from 'date-fns'

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

interface IScheduleHourBlock{
  hour: string;
  date: Date;
  isBooked: boolean;
}

interface IScheduleData{
  name: string;
  phoneNumber: string;
  hour: string;
  date: Date;  
}

export const ScheduleHourBlock = ({ hour, date, isBooked }: IScheduleHourBlock) => {  
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
    onSubmit: (values) => setSchedule({ 
      ...values, 
      hour,
      date
    }), 
  })     

  const setSchedule = async({ date, ...data }: IScheduleData) => {
    const { username } = router.query    
    
    await axios({
      method: 'POST',
      url: 'api/schedule',      
      data: {
        ...data,       
        date: format(date, 'yyyy-MM-dd'),
        username
      }
    })
    .then(() => {      
      resetForm()
      onClose()
      router.reload()            
    }).catch(() => {          
        alert(`O horário das ${hour} já foi agendado. Tente outro horário.`) 
        resetForm()     
        onClose()
      }
    )
  }

  const handleModalClose = () => {
    resetForm()
    return onClose()
  }

  return(
    <>
      <Button p={8} colorScheme="blue" onClick={onOpen} disabled={isBooked}>
        {hour}
      </Button>
      {!isBooked &&
        <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
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
                    mask=""
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
                    placeholder="(99) 9 9999-9999"
                    mask={["(99) 9999-9999", "(99) 9 9999-9999"]}
                    
                  />
                </Stack>
              </ModalBody>
              <ModalFooter>            
                <Button variant="outline" mr={3} onClick={handleModalClose}>Cancelar</Button>
                <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
                  Agendar horário
                </Button>            
              </ModalFooter>          
            </form>
          </ModalContent>
        </Modal>  
      }
    </>
  )
}