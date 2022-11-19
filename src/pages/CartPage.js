import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Button, Container, Divider, TextField } from '@mui/material'

import { useSelector } from 'react-redux'
import { selectAllCart } from '../redux/features/postSlice'
import Counter from '../components/Counter'

import { clearCart } from '../redux/features/postSlice'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  addCoupon,
  deleteCoupon,
  createOrder,
} from '../redux/features/orderSlice'
import { discountCalc, subtotalCalc, wholesale } from '../utility'
import { getCoupons } from '../redux/api'

const radioValues = [
  { id: 1, text: 'Flat rate $10', value: 10 },
  { id: 2, text: 'Free shipping', value: 0 },
  { id: 3, text: 'International $60', value: 60 },
  { id: 4, text: 'Local Delivery $5', value: 5 },
  { id: 5, text: 'Local Pickup (Free)', value: 0 },
]

function CartPage() {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { couponname, couponpercent } = useSelector((state) => ({
    ...state.order,
  }))
  const carts = useSelector(selectAllCart)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [coupons, setCoupons] = useState(null)
  const [couponState, setCouponState] = useState('')
  const [checkedShipping, setCheckedShipping] = useState(2)
  const [subtotalPrice, setSubtotalPrice] = useState(
    subtotalCalc(couponname, couponpercent, carts)
  )

  useEffect(() => {
    setSubtotalPrice(subtotalCalc(couponname, couponpercent, carts))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts, couponname])

  useEffect(() => {
    const fetchPost = async () => {
      const coupons = await getCoupons()
      setCoupons(coupons.data)
    }
    fetchPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      price: discountCalc(item.title, item.price, item.discount, item.count),
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
    dispatch(deleteCoupon())
  }

  function applyCouponFunc() {
    if (!couponname && coupons) {
      let findCoupon = coupons.filter((item) => item.name === couponState)
      console.log(findCoupon)
      if (findCoupon.length === 1) {
        dispatch(
          addCoupon({
            name: findCoupon[0].name,
            percent: findCoupon[0].percent,
          })
        )
        setCouponState('')
        console.log('success')
      } else {
        setCouponState('')
        console.log('no coupon found')
      }
    } else {
      setCouponState('')
      console.log('You already applied a coupon')
    }
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
                        color:
                          cart.discount && Number(cart.discount) ? 'red' : null,
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
                <Box>
                  {wholesale.includes(cart.title) ? (
                    <>
                      {cart.count > 2 ? (
                        <></>
                      ) : (
                        <>Get discount 10% with 3 or more items</>
                      )}
                    </>
                  ) : null}
                </Box>
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
          <Box>
            <Box>
              <Box style={{ paddingTop: '20px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <TextField
                    label='Enter Coupon'
                    value={couponState}
                    onChange={(e) => {
                      setCouponState(e.target.value)
                    }}
                  />
                  <Button variant='contained' onClick={applyCouponFunc}>
                    Apply
                  </Button>
                </Box>
                <Box>
                  {couponname ? (
                    <Typography variant='h5'>
                      {couponname} is applied ({couponpercent}% discount)
                    </Typography>
                  ) : null}
                </Box>
                <Box>
                  <Box>
                    <Typography>Cart Subtotal: </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='h5'>{subtotalPrice}</Typography>
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
                  <Typography variant='h5'>{totalPrice}</Typography>
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
