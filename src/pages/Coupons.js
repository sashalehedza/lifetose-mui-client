import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container, Divider } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Spinner from '../components/Spinner'
import { deleteCoupon, getAllCoupons } from '../redux/features/orderSlice'

function Coupons() {
  const { user, error } = useSelector((state) => ({ ...state.auth }))
  const { coupons } = useSelector((state) => ({
    ...state.order,
  }))
  // const userId = user?.result?._id
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCoupons())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon ?')) {
      dispatch(deleteCoupon({ id }))
    }
  }

  return (
    <Container>
      {error ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
            height: '100px',
          }}
        >
          <Typography variant='h4'>{error}</Typography>
        </Box>
      ) : (
        <>
          {!coupons ? (
            <Spinner />
          ) : (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Dashboard: {user?.result?.name}
              </Divider>
              {coupons.length ? (
                coupons.map((item) => (
                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      height: '200px',
                      marginBottom: '20px',
                    }}
                    key={item._id}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardContent>
                        <Typography component='div' variant='h5'>
                          Coupon name - {item.name}
                        </Typography>
                        <Box>
                          <Typography component='div' variant='h5'>
                            Discount percent - {item.percent}%
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
                        <Button onClick={() => handleDelete(item._id)}>
                          <DeleteIcon />
                        </Button>
                        <Link to={`/editCoupon/${item._id}`}>
                          <EditIcon />
                        </Link>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '20px',
                  }}
                >
                  <Typography variant='h5'>No coupons yet!</Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Coupons
