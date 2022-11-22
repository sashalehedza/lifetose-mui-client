import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { getMyOrders } from '../redux/features/orderSlice'
import { Box, Container, Divider } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

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
            height: '200px',
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
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    minHeight: '200px',
                    marginBottom: '20px',
                    p: 2,
                  }}
                  key={order._id}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box>
                      <Typography component='div' variant='h5'>
                        Order id - {order?._id}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        User id - {order?.user}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        User name - {order?.name}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        Subtotal Price - {order?.subtotalPrice}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        Shipping Method - {order?.shippingMethod}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        Shipping Price - {order?.shippingPrice}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        Total price - {order?.totalPrice}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        py: 1,
                      }}
                    >
                      <Typography component='div' variant='h5'>
                        Order Items
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      {order.orderItems.map((orderItem) => (
                        <Box key={orderItem._id} sx={{ mr: 2 }}>
                          <Typography component='div' variant='h5'>
                            Title - {orderItem.title}
                          </Typography>
                          <Typography component='div' variant='h5'>
                            Price - {orderItem.price}
                          </Typography>
                          <Typography component='div' variant='h5'>
                            Count - {orderItem.count}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      component='div'
                      variant='h5'
                      sx={{
                        backgroundColor: order?.isPaid ? 'green' : 'red',
                        color: 'white',
                        mb: 2,
                      }}
                    >
                      {order?.isPaid ? 'Paid' : 'Not Paid'}
                    </Typography>
                    <Typography
                      component='div'
                      variant='h5'
                      sx={{
                        backgroundColor: order?.isDelivered ? 'green' : 'red',
                        color: 'white',
                      }}
                    >
                      {order?.isDelivered ? 'Delivered' : 'Not Delivered'}
                    </Typography>
                  </Box>
                </Card>
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
