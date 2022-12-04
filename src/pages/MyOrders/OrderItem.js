import React from 'react'
import { Box, Grid, Card, Typography } from '@mui/material'

function OrderItem({ order }) {
  return (
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
          ></Box>
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
                backgroundColor: order?.isDelivered ? 'green' : 'red',
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
  )
}

export default OrderItem
