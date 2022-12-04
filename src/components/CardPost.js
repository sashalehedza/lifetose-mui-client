import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, likePost, selectAllCart } from '../redux/features/postSlice'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import { Box } from '@mui/system'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import RateStatic from './RateStatic'

function CardPost({
  imageFile,
  description,
  title,
  price,
  tags,
  _id,
  likes,
  discount,
  rating,
  numReviews,
}) {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [postCount] = useState(1)

  const userId = user?.result?._id
  const carts = useSelector(selectAllCart)

  const dispatch = useDispatch()
  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + ' ...'
    }
    return str
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon />
          &nbsp;
          {likes.length > 2
            ? `${likes.length} Likes`
            : `${likes.length} Like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
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

  const handleLike = () => {
    dispatch(likePost({ _id }))
  }

  const addToCartFunc = (postId) => {
    dispatch(addToCart({ postId: postId, count: postCount }))
  }

  return (
    <Card>
      <CardMedia
        component='img'
        height='160'
        image={imageFile}
        alt='green iguana'
        sx={{ objectFit: 'fill' }}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography gutterBottom variant='h5'>
            {title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' sx={{ color: 'red', mr: '5px' }}>
              {rating.toFixed(1)}
            </Typography>
            <RateStatic rating={rating} />
            <Typography variant='h6' sx={{ color: 'gray', ml: '5px' }}>
              ({numReviews})
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
          }}
        >
          {discount && Number(discount) !== 0 ? (
            <Typography gutterBottom variant='h5' sx={{ mr: '10px' }}>
              {discount
                ? `$${Number(price) - Number(discount)}`
                : `$${Number(price)}`}
            </Typography>
          ) : null}
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{
              color: discount && Number(discount) !== 0 ? 'red' : null,
              textDecoration:
                discount && Number(discount) !== 0 ? 'line-through' : null,
            }}
          >
            ${Number(price)}
          </Typography>
        </Box>

        <Box>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              addToCartFunc(String(_id))
            }}
            disabled={carts.some((item) => item._id === _id)}
          >
            {carts.some((item) => item._id === _id) ? 'in card' : 'add to card'}
          </Button>
        </Box>
        <Box style={{ paddingTop: '10px' }}>
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
        </Box>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{ paddingTop: '10px' }}
        >
          {excerpt(description)}
        </Typography>
      </CardContent>
      <CardActions>
        {!user?.result ? (
          <Tooltip title='Please login to like post'>
            <Button onClick={!user?.result ? null : handleLike} size='small'>
              <Likes />
            </Button>
          </Tooltip>
        ) : (
          <Button onClick={!user?.result ? null : handleLike} size='small'>
            <Likes />
          </Button>
        )}
        <Button size='small'>
          <Link
            to={`/post/${_id}`}
            style={{ color: 'blue', textDecoration: 'none' }}
          >
            Read More
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}

export default CardPost
