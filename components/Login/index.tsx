import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { firebaseClient, persistenceMode } from '../../config/firebase/client'

import { Logo } from '..'

import { 
  Container, 
  Box, 
  Input, 
  Button, 
  Text, 
  FormControl,
  FormLabel,  
  FormHelperText,
} from '@chakra-ui/react'

export const Login = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),    
    password: yup.string().required('A senha obrigatória'),     
  });

  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    isSubmitting 
  } = useFormik({
    validationSchema,
    initialValues: {
      email: '',
      password: '',      
    },
    onSubmit: async (values, form) => {     
      firebaseClient.auth().setPersistence(persistenceMode)

      try {
        const { email, password } = values
        const user = await firebaseClient.auth()
          .signInWithEmailAndPassword(email, password)

      } catch(error) {
        console.log('ERROR: ', error)
      }
    }
  }) 

  return (
    <Container p={20} centerContent>      
      <Logo />
      
      <Text mt={16}>
        Faça seu login
      </Text>      

      <Box mt={16} w="100%">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mb={8} isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input
              size="lg" 
              type="email" 
              value={values.email} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {
              touched.email &&
              <FormHelperText textColor="#e74c3c">{errors.email}</FormHelperText>          
            }
          </FormControl>

          <FormControl id="password" mb={8} isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              size="lg" 
              type="password" 
              value={values.password} 
              onChange={handleChange} 
              onBlur={handleBlur}
            />
            {
              touched.password &&
              <FormHelperText textColor="#e74c3c">{errors.password}</FormHelperText>        
            }
          </FormControl>      
          
          <Button           
            width="100%"  
            type="submit" 
            colorScheme="blue"            
            isLoading={isSubmitting}
          >Entrar</Button>
        </form>
      </Box>
      <Box mt={8}>
        <Link href="/signup">
          <a>Ainda não tem uma conta? Cadastre-se!</a>
        </Link>
      </Box>
    </Container>
  )
}
