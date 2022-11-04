import React, { useEffect } from 'react'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRelatedPosts, getPost } from '../redux/features/postSlice'

import RelatedPosts from '../components/RelatedPosts'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, Container, Divider } from '@mui/material'

import Comments from '../components/Comments'
import Spinner from '../components/Spinner'

function SinglePost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { post, relatedPosts } = useSelector((state) => ({ ...state.post }))
  const tags = post?.tags

  useEffect(() => {
    tags && dispatch(getRelatedPosts(tags))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
        .unwrap()
        .then(() => {
          // handle result here
        })
        .catch(() => {
          // handle error here
          navigate('/notfound')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Container>
      {!post ? (
        <Spinner />
      ) : (
        <Box>
          <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
            Post Page - {post ? post.title : ''}
          </Divider>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: '10px',
            }}
          >
            <Card sx={{ minWidth: 345 }}>
              <CardMedia
                component='img'
                height='140'
                image={post.imageFile}
                alt='green iguana'
                sx={{ objectFit: 'fill' }}
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {post.title}
                </Typography>
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/posts/tag/${tag}`}
                    style={{
                      color: 'blue',
                      textDecoration: 'none',
                      marginRight: '10px',
                    }}
                  >
                    #{tag}
                  </Link>
                ))}
              </CardContent>
            </Card>
          </Box>
          <Card sx={{ minWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Description: {post.description}
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <Comments />
          </Box>
        </Box>
      )}
      {!relatedPosts || !post ? (
        <Spinner />
      ) : (
        <Box>
          <RelatedPosts relatedPosts={relatedPosts} postId={id} />
        </Box>
      )}
    </Container>
  )
}

export default SinglePost
