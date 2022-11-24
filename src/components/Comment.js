import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { FaEdit, FaTrash } from 'react-icons/fa'

import { deleteComment, updateComment } from '../redux/api'
import { Box, Paper, TextareaAutosize, Typography } from '@mui/material'
import Rate from './Rate'
import RateStatic from './RateStatic'

const Comment = ({ comment, comments, setComments }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))

  const [editComment, setEditComment] = useState(false)
  const [updatedText, setUpdatedText] = useState('')
  const [updatedRating, setUpdatedRating] = useState(0)

  useEffect(() => {
    setUpdatedText(comment.text)
    setUpdatedRating(comment.rating)
  }, [comment])

  const editCommentHandler = async () => {
    try {
      const res = await updateComment(comment._id, {
        text: updatedText,
        rating: updatedRating,
      })
      setComments((prevState) =>
        [...prevState].map((item) =>
          String(item._id) === String(comment._id) ? res.data : item
        )
      )
      setUpdatedRating(0)
      setEditComment(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = (id) => {
    deleteComment(id)
    if (window.confirm('Are you sure you want to delete this comment?')) {
      if (comments) {
        setComments(comments.filter((item) => String(item._id) !== String(id)))
      }
    }
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
        <Paper sx={{ width: '100%', m: 0, p: 0 }}>
          <Box>
            <Typography variant='h5'>{comment?.commentedBy?.name}</Typography>
            <Box>{getCommentAudit()}</Box>
          </Box>
          {!editComment ? (
            <Typography>{comment.text}</Typography>
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
          <Box>
            <RateStatic rating={comment.rating} />
            {user?.result?._id === comment?.commentedBy?._id && (
              <IconButton
                variant='contained'
                color='success'
                onClick={() => setEditComment(!editComment)}
              >
                <FaEdit />
              </IconButton>
            )}
            {user?.result?._id === comment?.commentedBy?._id && (
              <IconButton
                variant='contained'
                color='error'
                onClick={() => handleDelete(comment._id)}
              >
                <FaTrash />
              </IconButton>
            )}
          </Box>
        </Paper>
      )}
    </>
  )
}

export default Comment
