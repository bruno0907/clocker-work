import { useFormik } from 'formik'
import * as yup from 'yup'

import Logo from '../src/components/Logo'

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

export default function Home() {
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
      console.log(values)
      setTimeout(() => {
        console.log(isSubmitting)
      }, 2000)
    }
  })  

  return (
    <Container p={20} centerContent>      
      <Logo />
      <Box mt={16} mb={16}>
        <Text>
          Crie sua agenda compartilhada
        </Text>
      </Box>
      <Box>
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
    </Container>
  )
}
