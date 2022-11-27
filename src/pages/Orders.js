import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import {
  getAllOrders,
  orderDelivered,
  orderPaid,
} from '../redux/features/orderSlice'
import { Box, Container, Divider, Grid } from '@mui/material'
import Card from '@mui/material/Card'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Orders() {
  const { orders } = useSelector((state) => ({
    ...state.order,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOrderPaid = (id, order) => {
    const updatedOrderData = {
      ...order,
      isPaid: !order.isPaid,
    }
    dispatch(orderPaid({ id: id, updatedOrderData: updatedOrderData }))
  }

  const handleOrderDelivered = (id, order) => {
    const updatedOrderData = {
      ...order,
      isDelivered: !order.isDelivered,
    }
    dispatch(orderDelivered({ id: id, updatedOrderData: updatedOrderData }))
  }

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
                <Card
                  sx={{
                    width: '100%',
                    minHeight: '200px',
                    marginBottom: '20px',
                    p: 2,
                  }}
                  key={order?._id}
                >
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={4} sm={8} md={4}>
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
                          {order?.orderItems?.map((orderItem) => (
                            <Box key={orderItem?._id} sx={{ mr: 2 }}>
                              <Typography component='div' variant='h5'>
                                Title - {orderItem?.title}
                              </Typography>
                              <Typography component='div' variant='h5'>
                                Price - {orderItem?.price}
                              </Typography>
                              <Typography component='div' variant='h5'>
                                Count - {orderItem?.count}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          component='div'
                          variant='h5'
                          sx={{
                            mb: 2,
                          }}
                        >
                          Change Status
                        </Typography>
                        <Button
                          variant='contained'
                          color={order?.isPaid ? 'error' : 'success'}
                          onClick={() => handleOrderPaid(order?._id, order)}
                          sx={{
                            width: '50%',
                            mb: 2,
                          }}
                        >
                          {order?.isPaid ? 'Not Paid' : 'Paid'}
                        </Button>
                        <Button
                          variant='contained'
                          color={order?.isDelivered ? 'error' : 'success'}
                          onClick={() =>
                            handleOrderDelivered(order?._id, order)
                          }
                          sx={{
                            width: '50%',
                          }}
                        >
                          {order?.isDelivered ? 'Not Delivered' : 'Delivered'}
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={4} sm={8} md={4}>
                      <Box>
                        <Typography
                          component='div'
                          variant='h5'
                          sx={{
                            mb: 2,
                          }}
                        >
                          Status
                        </Typography>
                        <Typography
                          component='div'
                          variant='h5'
                          sx={{
                            backgroundColor: order?.isPaid ? 'green' : 'red',
                            color: 'white',
                            mb: 2,
                            width: '50%',
                          }}
                        >
                          {order?.isPaid ? 'Paid' : 'Not Paid'}
                        </Typography>
                        <Typography
                          component='div'
                          variant='h5'
                          sx={{
                            backgroundColor: order?.isDelivered
                              ? 'green'
                              : 'red',
                            color: 'white',
                            width: '50%',
                          }}
                        >
                          {order?.isDelivered ? 'Delivered' : 'Not Delivered'}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
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
              <Typography variant='h5'>There is no orders yet!</Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  )
}

export default Orders
