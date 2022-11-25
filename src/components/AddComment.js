import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextareaAutosize } from '@mui/material'
import Rate from './Rate'
import { createPostReview } from '../redux/features/postSlice'

const AddComment = () => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const { id } = useParams()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(0)

  const addCommentHandler = async () => {
    try {
      let updatedPostData = { text, rating }
      dispatch(createPostReview({ id, updatedPostData }))
      setText('')
    } catch (err) {}
  }
  return (
    <Box sx={{ width: '100%', m: 0, p: 2 }}>
      {user?.result?._id ? (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TextareaAutosize
              style={{ width: '100%' }}
              minRows={3}
              placeholder='Input comment text...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              disabled={!text}
              onClick={addCommentHandler}
            >
              Add Comment
            </Button>
          </Box>
          <Rate rating={rating} onRating={(rate) => setRating(rate)} />
        </>
      ) : (
        <Box>To comment you need to be logged in!</Box>
      )}
    </Box>
  )
}

export default AddComment
