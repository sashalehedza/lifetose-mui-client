import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, Container, Divider } from '@mui/material'

import { useSelector } from 'react-redux'
import { selectAllCart } from '../redux/features/postSlice'
import Counter from '../components/Counter'

import { clearCart } from '../redux/features/postSlice'

import { useDispatch } from 'react-redux'
// import { createOrder } from '../redux/api'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../redux/features/orderSlice'

const radioValues = [
  { id: 1, text: 'Flat rate $10', value: 10 },
  { id: 2, text: 'Free shipping', value: 0 },
  { id: 3, text: 'International $60', value: 60 },
  { id: 4, text: 'Local Delivery $5', value: 5 },
  { id: 5, text: 'Local Pickup (Free)', value: 0 },
]

function CartPage() {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const carts = useSelector(selectAllCart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [checkedShipping, setCheckedShipping] = useState(2)

  const subtotalPrice = carts.reduce((price, product) => {
    return price + product.price * product.count
  }, 0)

  const checkedMethodValue = radioValues[checkedShipping - 1].value
  const checkedMethodText = radioValues[checkedShipping - 1].text

  const totalPrice = subtotalPrice + checkedMethodValue

  function setCheckedShippingFunc(id) {
    setCheckedShipping(id)
  }

  function makeOrder() {
    const filteredItems = carts.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      count: item.count,
    }))
    let orderData = {
      orderItems: filteredItems,
      subtotalPrice: subtotalPrice,
      shippingMethod: checkedMethodText,
      shippingPrice: checkedMethodValue,
      totalPrice: totalPrice,
      name: user?.result?.name,
    }
    dispatch(createOrder({ orderData, navigate }))
    dispatch(clearCart())
  }

  return (
    <Container>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
        Cart Page
      </Divider>
      {carts.length !== 0 ? (
        <>
          {carts.map((cart) => (
            <Card
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                height: '200px',
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
                  <Typography component='div' variant='h5'>
                    Price: {cart.price}
                  </Typography>
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
          ))}
          <Box className='payment'>
            <Box>
              <Box style={{ paddingTop: '20px' }}>
                <Box>
                  <Box>
                    <Typography>Cart Subtotal: </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography>{subtotalPrice}</Typography>
                </Box>
              </Box>
              <Box>
                <Box>
                  <Box>
                    <Typography>Shipping and Handling</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    {radioValues.map((radioValue) => (
                      <Box
                        key={radioValue.id}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          pl: 1,
                          pb: 1,
                        }}
                      >
                        <input
                          type='radio'
                          id={`default-radio`}
                          label={`${radioValue.text}`}
                          onChange={() => setCheckedShippingFunc(radioValue.id)}
                          checked={radioValue.id === checkedShipping}
                        />
                        <Box
                          sx={{
                            pl: 1,
                          }}
                        >
                          {radioValue.text}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box>
                  <Typography>ORDER TOTAL: </Typography>
                </Box>
                <Box>
                  <Typography>{totalPrice}</Typography>
                </Box>
                <Box>
                  <Button variant='contained' onClick={makeOrder}>
                    Make Order
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <Box>Your cart is currently empty!</Box>
      )}
    </Container>
  )
}

export default CartPage
