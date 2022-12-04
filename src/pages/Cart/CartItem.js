import React from 'react'

import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'

import Counter from '../../components/Counter'

function CartItem({ cart }) {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '200px',
        marginBottom: '20px',
      }}
      key={cart._id}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography component='div' variant='h5'>
            {cart.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            {cart.discount && Number(cart.discount) !== 0 ? (
              <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ mr: '10px' }}
              >
                {cart.discount && Number(cart.discount)
                  ? `$${Number(cart.price) - Number(cart.discount)}`
                  : `$${Number(cart.price)}`}
              </Typography>
            ) : null}
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{
                color: cart.discount && Number(cart.discount) ? 'red' : null,
                textDecoration:
                  cart.discount && Number(cart.discount)
                    ? 'line-through'
                    : null,
              }}
            >
              ${Number(cart.price)}
            </Typography>
          </Box>
        </CardContent>

        <Counter cart={cart} />
      </Box>
      <CardMedia
        component='img'
        sx={{
          width: 171,
          height: '100%',
          objectFit: 'fill',
        }}
        image={cart.imageFile}
        alt={cart.title}
      />
    </Card>
  )
}

export default CartItem
