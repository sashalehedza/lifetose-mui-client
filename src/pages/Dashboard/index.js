import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'

import AddEditPost from '../AddEditPost'

import Modal from '../../components/Modal/Modal'

import { useDispatch, useSelector } from 'react-redux'

import { getPosts } from '../../redux/features/postSlice'

import Spinner from '../../components/Spinner'

import { Box, Typography, Container, Divider, Button } from '@mui/material'

function Dashboard() {
  const [modalActive, setModalActive] = useState(false)
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { posts, error } = useSelector((state) => ({
    ...state.post,
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          {!posts ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
              }}
            >
              <Spinner />
            </Box>
          ) : (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Dashboard: {user?.result?.name}
              </Divider>
              <Box>
                <Button
                  variant='contained'
                  onClick={() => setModalActive(true)}
                >
                  Add Coupon
                </Button>
              </Box>
              {posts.length ? (
                posts.map((post) => <PostItem key={post._id} post={post} />)
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
                  <Typography variant='h5'>
                    No post available with the user: {user?.result?.name}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </>
      )}
      <Modal active={modalActive} setActive={setModalActive}>
        <AddEditPost setModalActive={setModalActive} />
      </Modal>
    </Container>
  )
}

export default Dashboard
