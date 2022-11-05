import React, { useEffect, useState } from 'react'

import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, searchPosts } from '../redux/features/postSlice'

import CardPost from '../components/CardPost'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Button, Divider, Typography } from '@mui/material'
import { TextField } from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import { Container } from '@mui/system'
import Spinner from '../components/Spinner'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Home() {
  const { posts, error } = useSelector((state) => ({
    ...state.post,
  }))

  const [search, setSearch] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const query = useQuery()
  const searchQuery = query.get('searchQuery')

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchPosts(searchQuery))
    } else {
      dispatch(getPosts())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    if (search) {
      dispatch(searchPosts(search))
      navigate(`/posts/search?searchQuery=${search}`)
      setSearch('')
    } else {
      dispatch(searchPosts(''))
      navigate('/')
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
            height: '200px',
          }}
        >
          {error}
        </Box>
      ) : (
        <>
          {!posts ? (
            <Spinner />
          ) : (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Home
              </Divider>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginY: '20px',
                }}
              >
                <TextField
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  label='Search...'
                  sx={{
                    width: '250px',
                    backgroundColor: 'white',
                    marginRight: '10px',
                  }}
                  variant='filled'
                />
                <Button onClick={handleSubmit}>
                  <SearchIcon />
                </Button>
              </Box>
              {posts.length === 0 && location.pathname === '/' && (
                <Typography>No Posts Found</Typography>
              )}
              {posts.length === 0 && location.pathname !== '/' && (
                <Typography>
                  We couldn't find any matches for "{searchQuery}"
                </Typography>
              )}
              {posts.length !== 0 && (
                <Grid container spacing={4}>
                  {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={4} key={post._id}>
                      <CardPost {...post} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default Home
