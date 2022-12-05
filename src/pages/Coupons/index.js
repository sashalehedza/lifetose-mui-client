import React, { useEffect, useState } from 'react'
import CouponItem from './CouponItem'

import { useDispatch, useSelector } from 'react-redux'

import Spinner from '../../components/Spinner'

import { getAllCoupons } from '../../redux/features/orderSlice'

import { Box, Typography, Container, Divider, Button } from '@mui/material'
import Modal from '../../components/Modal/Modal'
import AddCoupon from './AddCoupon'

function Coupons() {
  const [modalActive, setModalActive] = useState(false)
  const { user, error } = useSelector((state) => ({ ...state.auth }))
  const { coupons } = useSelector((state) => ({
    ...state.order,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCoupons())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          {!coupons ? (
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
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Dashboard: {user?.result?.name}
              </Divider>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginBottom: '20px',
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => setModalActive(true)}
                >
                  Add Coupon
                </Button>
              </Box>
              {coupons.length ? (
                coupons.map((coupon) => (
                  <CouponItem key={coupon._id} coupon={coupon} />
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '20px',
                  }}
                >
                  <Typography variant='h5'>No coupons yet!</Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        <AddCoupon setModalActive={setModalActive} />
      </Modal>
    </Container>
  )
}

export default Coupons
