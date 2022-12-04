import React from 'react'

import { useNavigate } from 'react-router-dom'

import { excerpt } from '../../utility'

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material'

function PostItem({ post }) {
  const navigate = useNavigate()
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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
          <Button size='small' onClick={() => navigate(`/post/${post._id}`)}>
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
        image={post.imageFile}
        alt={post.title}
      />
    </Card>
  )
}

export default PostItem
