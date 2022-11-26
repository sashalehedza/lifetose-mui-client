import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, TextareaAutosize } from '@mui/material'
import Rate from './Rate'
import { createPostReview } from '../redux/features/postSlice'

const AddComment = ({ comments }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const { id } = useParams()
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)

  const alreadyReviewed = comments.find(
    (r) => r.user.toString() === user.result._id.toString()
  )

  const addCommentHandler = async () => {
    try {
      let reviewData = { text, rating }
      dispatch(createPostReview({ id, reviewData }))
      setText('')
    } catch (err) {}
  }
  return (
    <Box sx={{ width: '100%', m: 0, p: 2 }}>
      {user?.result?._id ? (
        <>
          {!alreadyReviewed ? (
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
            <Box>You already reviewed this product!</Box>
          )}
        </>
      ) : (
        <Box>To comment you need to be logged in!</Box>
      )}
    </Box>
  )
}

export default AddComment
