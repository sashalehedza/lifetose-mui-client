import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCoupon } from '../../redux/api'

import Spinner from '../../components/Spinner'

import { Box, Button, Container, Divider, Typography } from '@mui/material'

import { toast } from 'react-toastify'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import InputField from '../../components/InputField'

import { extractErrorMessage } from '../../redux/utils'
import { updateCoupon } from '../../redux/features/orderSlice'

const validationSchema = yup.object({
  name: yup
    .string('Enter coupon name')
    .min(1, 'Coupon name should be of minimum 1 characters length')
    .required('Coupon name is required'),
  percent: yup.number().min(0).required('Percente is required'),
})

function EditCoupon({ id, setModalActive }) {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [coupon, setCoupon] = useState({
    name: '',
    percent: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      const fetchCoupon = async () => {
        try {
          const coupon = await getCoupon(id)
          setCoupon(coupon.data)
          setLoading(false)
        } catch (err) {
          if (err.message === 'Network Error') {
            toast.error(extractErrorMessage(err))
            setError(extractErrorMessage(err))
            setLoading(false)
          }
          if (err.response.data.message === 'Coupon not found') {
            navigate('/notfound')
            toast.error(extractErrorMessage(err))
            setError(extractErrorMessage(err))
            setLoading(false)
          }
        }
      }
      fetchCoupon()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Container>
      {error ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
            height: '100px',
          }}
        >
          <Typography variant='h4'>{error}</Typography>
        </Box>
      ) : (
        <>
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
              }}
            >
              <Spinner />
            </Box>
          ) : (
            <>
              <Divider sx={{ marginTop: '20px' }}>Edit Coupon</Divider>
              <Container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: '240px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Formik
                    initialValues={coupon}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => {
                      let { name, percent } = values

                      if (name && percent) {
                        const updatedCouponData = {
                          ...values,
                          user: user?.result?.name,
                        }
                        dispatch(
                          updateCoupon({ id, updatedCouponData, navigate })
                        )
                        setModalActive(false)
                      }
                    }}
                  >
                    <Form>
                      <InputField
                        name='name'
                        placeholder='Enter coupon name'
                        label='name'
                      />
                      <InputField
                        name='percent'
                        placeholder='Enter coupon percent'
                        label='percent'
                      />
                      <Box>
                        <Button
                          variant='contained'
                          type='submit'
                          sx={{ mt: 1, mb: 1 }}
                          fullWidth
                        >
                          Edit
                        </Button>
                      </Box>
                    </Form>
                  </Formik>
                </Box>
              </Container>
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default EditCoupon
