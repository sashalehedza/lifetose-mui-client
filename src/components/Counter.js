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

function Counter({ cart }) {
  const dispatch = useDispatch()

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
        {/* <Typography variant='h5'> ${cart.count * cart.price}</Typography> */}
        <Typography variant='h5'>
          {cart.discount && Number(cart.discount) !== 0
            ? cart.count > 2
              ? `$${
                  (Number(cart.price) - Number(cart.discount)) *
                  Number(cart.count) *
                  0.9
                }`
              : `$${(Number(cart.price) - Number(cart.discount)) * cart.count}`
            : cart.count > 2
            ? `$${Number(cart.price) * Number(cart.count) * 0.9}`
            : `$${Number(cart.price) * Number(cart.count)}`}
        </Typography>
        <IconButton color='error' onClick={() => removeFromCartFunc()}>
          <TiDeleteOutline
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
          />
        </IconButton>
      </Box>
    </>
  )
}

export default Counter
