import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { FaEdit, FaTrash } from 'react-icons/fa'

import { Box, Paper, TextareaAutosize, Typography } from '@mui/material'
import Rate from './Rate'
import RateStatic from './RateStatic'
import { deletePostReview, updatePostReview } from '../redux/features/postSlice'
import { useParams } from 'react-router-dom'

const Comment = ({ comment }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const { id } = useParams()

  const [editComment, setEditComment] = useState(false)
  const [updatedText, setUpdatedText] = useState('')
  const [updatedRating, setUpdatedRating] = useState(0)

  useEffect(() => {
    setUpdatedText(comment.text)
    setUpdatedRating(comment.rating)
  }, [comment])

  const editCommentHandler = async () => {
    try {
      let reviewData = { text: updatedText, rating: updatedRating }
      dispatch(updatePostReview({ id, reviewId: comment._id, reviewData }))
      setUpdatedRating(0)
      setEditComment(false)
    } catch (err) {}
  }

  const handleDelete = () => {
    dispatch(deletePostReview({ id, reviewId: comment._id }))
  }

  const getCommentAudit = () => {
    if (comment.createdAt === comment.updatedAt) {
      return (
        <Typography>
          Created At{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.createdAt}</Moment>
        </Typography>
      )
    } else
      return (
        <Typography>
          Last Updated{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.updatedAt}</Moment>
        </Typography>
      )
  }

  return (
    <>
      {comment && (
        <Paper sx={{ width: '100%', m: 0, p: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant='h5'>{comment.name}</Typography>
            </Box>
            <Box>
              <RateStatic rating={comment.rating} />
            </Box>
          </Box>
          {!editComment ? (
            <Box
              sx={{
                width: '50%',
                wordWrap: 'break-word',
              }}
            >
              <Typography>{comment.text}</Typography>
            </Box>
          ) : (
            <Box>
              <TextareaAutosize
                type='text'
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
              />
              <Button
                variant='contained'
                color='secondary'
                disabled={
                  updatedText === comment.text &&
                  updatedRating === comment.rating
                }
                onClick={editCommentHandler}
              >
                Update
              </Button>
              <Rate
                rating={updatedRating}
                onRating={(rate) => setUpdatedRating(rate)}
              />
              <Button
                variant='contained'
                onClick={() => {
                  setEditComment(false)
                  setUpdatedText(comment.text)
                }}
              >
                Cancel
              </Button>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              {user?.result?._id === comment.user && (
                <IconButton
                  variant='contained'
                  color='success'
                  onClick={() => setEditComment(!editComment)}
                >
                  <FaEdit />
                </IconButton>
              )}
              {user?.result?._id === comment.user && (
                <IconButton
                  variant='contained'
                  color='error'
                  onClick={handleDelete}
                >
                  <FaTrash />
                </IconButton>
              )}
            </Box>
            <Box>{getCommentAudit()}</Box>
          </Box>
        </Paper>
      )}
    </>
  )
}

export default Comment
