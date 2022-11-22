import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, getPosts } from '../redux/features/postSlice'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container, Divider } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Spinner from '../components/Spinner'

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

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + ' ...'
    }
    return str
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post ?')) {
      dispatch(deletePost({ id }))
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
                posts.map((item) => (
                  <Card
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      width: '100%',
                      minHeight: '200px',
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
                          {item.title}
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          color='text.secondary'
                          component='div'
                        >
                          {excerpt(item.description, 40)}
                        </Typography>
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
                        <Link to={`/editPost/${item._id}`}>
                          <EditIcon />
                        </Link>
                      </Box>
                    </Box>
                    <CardMedia
                      component='img'
                      sx={{
                        width: 171,
                        height: '100%',
                        objectFit: 'fill',
                      }}
                      image={item.imageFile}
                      alt={item.title}
                    />
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
