import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, likePost } from '../redux/features/postSlice'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { Box } from '@mui/system'

function CardPost({
  imageFile,
  description,
  title,
  price,
  tags,
  _id,
  name,
  likes,
}) {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [postCount] = useState(1)
  const userId = user?.result?._id

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
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>

        <Typography gutterBottom variant='h5' component='div'>
          ${price}
        </Typography>
        <Box>
          <Button
            variant='contained'
            color='success'
            onClick={() => {
              addToCartFunc(String(_id))
            }}
          >
            add to cart
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
