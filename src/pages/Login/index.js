import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { login } from '../../redux/features/authSlice'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import InputField from '../../components/InputField'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Button, Box, Grid, Typography, Container } from '@mui/material'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const backToRegister = () => navigate('/register')

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
            Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              onSubmit={(values) => {
                dispatch(login({ values, navigate }))
              }}
              validationSchema={validationSchema}
            >
              <Form>
                <InputField name='email' placeholder='Enter your email' />
                <InputField
                  name='password'
                  type='password'
                  placeholder='Enter your password'
                />
                <Button
                  variant='contained'
                  type='submit'
                  sx={{ mt: 1, mb: 1 }}
                  fullWidth
                >
                  Login
                </Button>
              </Form>
            </Formik>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Button onClick={backToRegister}>
                  {"Don't have an account? Register"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login
