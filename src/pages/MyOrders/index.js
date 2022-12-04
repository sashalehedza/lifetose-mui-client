import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/Spinner'
import { getMyOrders } from '../../redux/features/orderSlice'
import { Box, Container, Divider, Typography } from '@mui/material'
import OrderItem from './OrderItem'

function MyOrders() {
  const { myorders } = useSelector((state) => ({
    ...state.order,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      {!myorders ? (
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
          {myorders.length ? (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Orders
              </Divider>
              {myorders.map((order) => (
                <OrderItem order={order} />
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
              <Typography variant='h5'>You have no orders yet</Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  )
}

export default MyOrders
