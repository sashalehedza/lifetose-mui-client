import React from 'react'
import {
  addToCart,
  minusFromCart,
  removeFromCart,
  replaceInCart,
} from '../redux/features/postSlice'
import { useDispatch } from 'react-redux'

import { TiDeleteOutline } from 'react-icons/ti'
import { Box, Button, TextField, Typography } from '@mui/material'

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
      <TextField
        field='quantity'
        label='Count'
        value={cart.count}
        onChange={onQuantityChanged}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          field='quantity'
          variant='contained'
          onClick={() => {
            minusFromCartFunc()
          }}
          disabled={cart.count === 1}
        >
          <RemoveIcon />
        </Button>
        <Button
          field='quantity'
          variant='contained'
          onClick={() => {
            addToCartFunc()
          }}
        >
          <AddIcon />
        </Button>
      </Box>

      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant='h5'> ${cart.count * cart.price}</Typography>
        </Box>
        <Box onClick={() => removeFromCartFunc()} sx={{ marginLeft: '20px' }}>
          <TiDeleteOutline
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
          />
        </Box>
      </Box>
    </>
  )
}

export default Counter
