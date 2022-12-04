import React, { useEffect } from 'react'
import PostItem from './PostItem'

import { useDispatch, useSelector } from 'react-redux'

import { getPosts } from '../../redux/features/postSlice'

import Spinner from '../../components/Spinner'

import { Box, Typography, Container, Divider } from '@mui/material'

function Dashboard() {
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
              {posts.length ? (
                posts.map((post) => <PostItem post={post} />)
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
    </Container>
  )
}

export default Dashboard
