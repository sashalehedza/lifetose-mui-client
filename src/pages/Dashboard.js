import React, { useEffect, useState } from 'react'

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
import Pagination from '../components/Pagination'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

function Dashboard() {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { posts, limit, total, error } = useSelector((state) => ({
    ...state.post,
  }))

  const dispatch = useDispatch()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getPosts({ page, search }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search])

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
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginY: '20px',
                }}
              >
                <Paper
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 300,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder='Search posts'
                    inputProps={{ 'aria-label': 'search posts' }}
                    onChange={(e) => setSearch(e.target.value)}
                    // onKeyDown={handleKeyDown}
                  />
                  <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    aria-label='search'
                    // onClick={handleSubmit}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>
              {posts.length ? (
                <>
                  {' '}
                  {posts.map((item) => (
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
                  ))}
                  <Pagination
                    page={page}
                    limit={limit ? limit : 0}
                    total={total ? total : 0}
                    setPage={(page) => setPage(page)}
                  />
                </>
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
