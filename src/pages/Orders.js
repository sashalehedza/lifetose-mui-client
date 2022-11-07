import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { getOrders } from '../redux/features/orderSlice'
import { Box, Container } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function Orders() {
  const { orders } = useSelector((state) => ({
    ...state.order,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Container>
      {!orders ? (
        <Spinner />
      ) : (
        <Box>
          {orders.length ? (
            <>
              {orders.map((order) => (
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    width: '100%',
                    height: '200px',
                    marginBottom: '20px',
                  }}
                  key={order._id}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <CardContent>
                      <Typography component='div' variant='h5'>
                        {order._id}
                      </Typography>
                      <Typography component='div' variant='h5'>
                        totalPrice - {order.totalPrice}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pb: 1,
                      }}
                    ></Box>
                  </Box>
                </Card>
              ))}
            </>
          ) : (
            <Box>You have no orders yet</Box>
          )}
        </Box>
      )}
    </Container>
  )
}

export default Orders
