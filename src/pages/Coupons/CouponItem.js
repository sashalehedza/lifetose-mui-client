import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { deleteCoupon } from '../../redux/features/orderSlice'

import { Box, Card, CardContent, Typography, Button } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function CouponItem({ coupon }) {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon ?')) {
      dispatch(deleteCoupon({ id }))
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        height: '200px',
        marginBottom: '20px',
      }}
      key={coupon._id}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography component='div' variant='h5'>
            Coupon name - {coupon.name}
          </Typography>
          <Box>
            <Typography component='div' variant='h5'>
              Discount percent - {coupon.percent}%
            </Typography>
          </Box>
        </CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            pl: 1,
            pb: 1,
          }}
        >
          <Button onClick={() => handleDelete(coupon._id)}>
            <DeleteIcon />
          </Button>
          <Link to={`/editCoupon/${coupon._id}`}>
            <EditIcon />
          </Link>
        </Box>
      </Box>
    </Card>
  )
}

export default CouponItem
