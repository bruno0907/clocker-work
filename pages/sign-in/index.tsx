import { useContext } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { AuthContext } from '../../contexts/AuthContext'

import { Logo } from '../../components'

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

export default function SignIn(){
  const { signIn } = useContext(AuthContext)

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
    onSubmit: values => {      
      const { email, password } = values
      signIn({ email, password })
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
        <Link href="/sign-up">
          <a>Ainda não tem uma conta? Cadastre-se!</a>
        </Link>
      </Box>
    </Container>
  )
}
