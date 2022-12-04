import React, { useState } from 'react'

import AddEditCoupon from '../AddEditCoupon'

import { useDispatch } from 'react-redux'
import { deleteCoupon } from '../../redux/features/orderSlice'

import { Box, Card, CardContent, Typography, Button } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Modal from '../../components/Modal/Modal'

function CouponItem({ coupon }) {
  const [modalActive, setModalActive] = useState(false)
  const [id, setId] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon ?')) {
      dispatch(deleteCoupon({ id }))
    }
  }

  const handleOpenEditForm = (id) => {
    setModalActive(true)
    setId(id)
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
          <Button onClick={() => handleOpenEditForm(coupon._id)}>
            <EditIcon />
          </Button>
        </Box>
      </Box>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddEditCoupon id={id} setModalActive={setModalActive} />
      </Modal>
    </Card>
  )
}

export default CouponItem
