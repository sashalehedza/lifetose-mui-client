import React, { useEffect, useState } from 'react'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRelatedPosts,
  getPost,
  selectAllCart,
} from '../../redux/features/postSlice'

import RelatedPosts from '../../components/RelatedPosts'

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Tooltip,
} from '@mui/material'

import Comments from '../../components/Comments'
import Spinner from '../../components/Spinner'
import RateStatic from '../../components/RateStatic'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'

import { addToCart, likePost } from '../../redux/features/postSlice'

function SinglePost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { post, relatedPosts, error } = useSelector((state) => ({
    ...state.post,
  }))
  const { user } = useSelector((state) => ({ ...state.auth }))
  const carts = useSelector(selectAllCart)
  const tags = post?.tags
  const userId = user?.result?._id
  const [postCount] = useState(1)

  useEffect(() => {
    tags && dispatch(getRelatedPosts(tags))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  useEffect(() => {
    if (id) {
      dispatch(getPost({ id, navigate }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon />
          &nbsp;
          {post.likes.length > 2
            ? `${post.likes.length} Likes`
            : `${post.likes.length} Like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      )
    }
    return (
      <>
        <ThumbUpOffAltIcon />
        &nbsp;Like
      </>
    )
  }

  const handleLike = (id) => {
    dispatch(likePost({ _id: id }))
  }

  const addToCartFunc = (postId) => {
    dispatch(addToCart({ postId: postId, count: postCount }))
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
          {!post ? (
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
            <Box>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                {post ? `Post Title - ${post.title}` : 'Post loading Error'}
              </Divider>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: '10px',
                }}
              >
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 8 }}
                >
                  <Grid item xs={4} sm={4} md={4}>
                    <Card>
                      <CardMedia
                        component='img'
                        height='140'
                        image={post.imageFile}
                        alt='green iguana'
                        sx={{ objectFit: 'fill' }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          margin: '20px',
                        }}
                      >
                        {!user?.result ? (
                          <Tooltip title='Please login to like post'>
                            <Button
                              onClick={() =>
                                !user?.result ? null : handleLike(id)
                              }
                              size='small'
                            >
                              <Likes />
                            </Button>
                          </Tooltip>
                        ) : (
                          <Button
                            onClick={() =>
                              !user?.result ? null : handleLike(id)
                            }
                            size='small'
                          >
                            <Likes />
                          </Button>
                        )}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant='h5'
                            sx={{ color: 'red', mr: '5px' }}
                          >
                            {post.rating.toFixed(1)}
                          </Typography>
                          <RateStatic rating={post.rating} />
                          <Typography
                            variant='h6'
                            sx={{ color: 'gray', ml: '5px' }}
                          >
                            ({post.numReviews})
                          </Typography>
                        </Box>
                        <Box>
                          <Button
                            variant='contained'
                            color='success'
                            onClick={() => {
                              addToCartFunc(String(id))
                            }}
                            disabled={carts.some(
                              (item) => item._id === post._id
                            )}
                          >
                            {carts.some((item) => item._id === post._id)
                              ? 'in cart'
                              : 'add to cart'}
                          </Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          Title: {post.title}
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                          Tags:{' '}
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
                        </Typography>
                        <Typography gutterBottom variant='h5' component='div'>
                          Description: {post.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant='h5'
                            sx={{ mr: '10px' }}
                          >
                            Price:
                          </Typography>
                          {post.discount && Number(post.discount) !== 0 ? (
                            <Typography variant='h5' sx={{ mr: '10px' }}>
                              {post.discount
                                ? `$${
                                    Number(post.price) - Number(post.discount)
                                  }`
                                : `$${Number(post.price)}`}
                            </Typography>
                          ) : null}
                          <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{
                              color:
                                post.discount && Number(post.discount) !== 0
                                  ? 'red'
                                  : null,
                              textDecoration:
                                post.discount && Number(post.discount) !== 0
                                  ? 'line-through'
                                  : null,
                              mr: '10px',
                            }}
                          >
                            ${Number(post.price)}
                          </Typography>
                          {post.discount && Number(post.discount) !== 0 ? (
                            <Typography
                              gutterBottom
                              variant='h5'
                              sx={{
                                mr: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                              }}
                            >
                              -
                              {(
                                (100 *
                                  (Number(post.price) -
                                    (Number(post.price) -
                                      Number(post.discount)))) /
                                Number(post.price)
                              ).toFixed(0)}
                              %
                            </Typography>
                          ) : null}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Comments comments={post.reviews} />
              </Box>
              {!relatedPosts || !post ? (
                <Spinner />
              ) : (
                <Box>
                  <RelatedPosts relatedPosts={relatedPosts} postId={id} />
                </Box>
              )}
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

export default SinglePost
