import React, { useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByTag } from '../redux/features/postSlice'

import { excerpt } from '../utility'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Container, Divider } from '@mui/material'
import Spinner from '../components/Spinner'

function TagPosts() {
  const { tagPosts, error } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { tag } = useParams()

  useEffect(() => {
    if (tag) {
      dispatch(getPostsByTag(tag))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

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
          {!tagPosts ? (
            <Spinner />
          ) : (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Posts with tag: {tag}
              </Divider>
              {tagPosts.length === 0 && (
                <Typography sx={{ marginTop: '20px', marginBottom: '20px' }}>
                  No Posts Found with tag: {tag}
                </Typography>
              )}
              {tagPosts &&
                tagPosts.map((item) => (
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
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                        <Button
                          size='small'
                          onClick={() => navigate(`/post/${item._id}`)}
                        >
                          Read More
                        </Button>
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
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default TagPosts
