import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Box, Button, Divider } from '@mui/material'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import InputField from '../../components/InputField'

import { createCoupon } from '../../redux/features/orderSlice'

const validationSchema = yup.object({
  name: yup
    .string('Enter coupon name')
    .min(1, 'Coupon name should be of minimum 1 characters length')
    .required('Coupon name is required'),
  percent: yup.number().min(0).required('Percente is required'),
})

function AddCoupon({ setModalActive }) {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [coupon] = useState({
    name: '',
    percent: 0,
  })

  return (
    <Box>
      <>
        <Divider sx={{ marginTop: '20px' }}>Add Coupon</Divider>
        <Box
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
                  dispatch(createCoupon({ updatedCouponData, navigate }))
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
                    Add
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </>
    </Box>
  )
}

export default AddCoupon
