import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { getAllOrders } from '../../redux/features/orderSlice'
import { Box, Container, Divider, Typography } from '@mui/material'

import OrderItem from './OrderItem'

function Orders() {
  const { orders } = useSelector((state) => ({
    ...state.order,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {!orders ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Box>
          {orders?.length ? (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Orders
              </Divider>
              {orders?.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </>
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
              <Typography variant='h5'>There is no orders yet!</Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  )
}

export default Orders
