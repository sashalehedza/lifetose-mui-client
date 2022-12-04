import React from 'react'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { clearCart, deletePost } from '../../redux/features/postSlice'

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

function PostItem({ post }) {
  const dispatch = useDispatch()

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
    dispatch(clearCart())
  }
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        minHeight: '200px',
        marginBottom: '20px',
      }}
      key={post._id}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography component='div' variant='h5'>
            {post.title}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {excerpt(post.description, 40)}
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
          <Button onClick={() => handleDelete(post._id)}>
            <DeleteIcon />
          </Button>
          <Link to={`/editPost/${post._id}`}>
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
        image={post.imageFile}
        alt={post.title}
      />
    </Card>
  )
}

export default PostItem
