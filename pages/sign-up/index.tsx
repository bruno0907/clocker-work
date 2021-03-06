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
  InputLeftAddon,
  InputGroup,
  Button, 
  Text, 
  FormControl,
  FormLabel,  
  FormHelperText,
} from '@chakra-ui/react'

export default function Signup() {
  const { signUp } = useContext(AuthContext);

  const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),    
    password: yup.string().required('A senha obrigatória'),
    username: yup.string().required('O nome de usuário é obrigatório')    
  });

  const { values, 
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
      username: ''
    },
    onSubmit: values => {      
      const { email, password, username } = values 
      signUp({ email, password, username })        
    }    
  })  

  return (
    <Container p={20} centerContent>      
      <Logo />
      <Text mt={16}>
        Crie sua agenda compartilhada
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

        <FormControl id="username" mb={8} isRequired>   
          <InputGroup size="lg">
            <InputLeftAddon children="clocker.work/" />         
            <Input
              type="username" 
              value={values.username} 
              onChange={handleChange} 
              onBlur={handleBlur}
            /> 
          </InputGroup>
          { 
            touched.username &&
            <FormHelperText textColor="#e74c3c">{errors.username}</FormHelperText>                   
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
        <Link href="/">
          <a>Já tem uma conta? Acesse aqui!</a>
        </Link>
      </Box>   
    </Container>
  )
}

