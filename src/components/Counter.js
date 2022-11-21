import React from 'react'
import {
  addToCart,
  minusFromCart,
  removeFromCart,
  replaceInCart,
} from '../redux/features/postSlice'
import { useDispatch } from 'react-redux'

import { TiDeleteOutline } from 'react-icons/ti'
import { Box, TextField, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { discountCalc } from '../utility'

function Counter({ cart }) {
  const dispatch = useDispatch()

  let extraCount =
    Math.trunc(Number(cart.count) / cart.saleCount) * cart.saleDiscount

  const addToCartFunc = () => {
    dispatch(addToCart({ postId: cart._id, count: 1 }))
  }

  const minusFromCartFunc = () => {
    dispatch(minusFromCart({ postId: cart._id, count: 1 }))
  }

  const removeFromCartFunc = () => {
    dispatch(removeFromCart({ postId: cart._id }))
  }

  const onQuantityChanged = (e) => {
    dispatch(
      replaceInCart({
        postId: cart._id,
        count: Number(Number(e.target.value.replace(/\D/g, ''))),
      })
    )
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconButton
          color='primary'
          onClick={() => {
            minusFromCartFunc()
          }}
          disabled={cart.count === 1}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          label='Count'
          value={cart.count}
          onChange={onQuantityChanged}
          sx={{
            width: '60px',
          }}
        />
        <IconButton
          color='primary'
          onClick={() => {
            addToCartFunc()
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          ml: '16px',
          mt: '15px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>
          {discountCalc(
            cart.saleCount,
            cart.saleDiscount,
            cart.price,
            cart.discount,
            cart.count
          )}
        </Typography>

        <IconButton color='error' onClick={() => removeFromCartFunc()}>
          <TiDeleteOutline
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
          />
        </IconButton>
      </Box>
      <Box>
        <Box>
          {cart.saleCount > 0 && cart.saleDiscount > 0 ? (
            <>
              <Box>
                <Typography>
                  You will get extra {cart.saleDiscount} items for every{' '}
                  {cart.saleCount} items.
                </Typography>
              </Box>
              <Typography>
                For now you have {extraCount} extra items.
              </Typography>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  )
}

export default Counter
