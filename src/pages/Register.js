import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { register } from '../redux/features/authSlice'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import InputField from '../components/InputField'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your First Name')
    .min(1, 'First Name should be of minimum 1 characters length')
    .required('First Name is required'),
  lastName: yup
    .string('Enter your Last Name')
    .min(1, 'Last Name should be of minimum 1 characters length')
    .required('Last Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm Password')
    .min(6, 'Confirm Password should be of minimum 6 characters length')
    .required('Confirm Password is required'),
})

function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const backToLogin = () => navigate('/login')

  return (
    <>
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '240px',
            marginTop: 6,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={(values) => {
                let { firstName, lastName, email, password, confirmPassword } =
                  values
                if (password !== confirmPassword) {
                  return window.alert(
                    'password and confirm password are not matches'
                  )
                }
                if (
                  email &&
                  password &&
                  firstName &&
                  lastName &&
                  confirmPassword
                ) {
                  dispatch(register({ values, navigate }))
                }
              }}
              validationSchema={validationSchema}
            >
              <Form>
                <InputField name='firstName' placeholder='Enter your name' />
                <InputField name='lastName' placeholder='Enter your lastname' />
                <InputField name='email' placeholder='Enter your email' />
                <InputField name='password' placeholder='Enter your password' />
                <InputField
                  name='confirmPassword'
                  placeholder='Confirm Password'
                />
                <Box>
                  <Button
                    variant='contained'
                    type='submit'
                    sx={{ mt: 1, mb: 1 }}
                    fullWidth
                  >
                    Register
                  </Button>
                </Box>
              </Form>
            </Formik>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Button onClick={backToLogin}>
                  {'Already have an account? Login'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register
