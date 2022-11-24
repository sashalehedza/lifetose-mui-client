import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { FaEdit, FaTrash } from 'react-icons/fa'

import { deleteComment, updateComment } from '../redux/api'
import { Box, Paper, TextareaAutosize, Typography } from '@mui/material'

const Comment = ({ comment, comments, setComments }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))

  const [editComment, setEditComment] = useState(false)
  const [updatedText, setUpdatedText] = useState('')

  useEffect(() => {
    setUpdatedText(comment.text)
  }, [comment])

  const editCommentHandler = async () => {
    try {
      const res = await updateComment(comment._id, { text: updatedText })
      setComments((prevState) =>
        [...prevState].map((item) =>
          String(item._id) === String(comment._id) ? res.data : item
        )
      )
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
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>Created At </Box>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.createdAt}</Moment>
        </Box>
      )
    } else
      return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box>Last Updated </Box>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.updatedAt}</Moment>
        </Box>
      )
  }

  return (
    <>
      {comment && (
        <Paper sx={{ width: '100%' }}>
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
                disabled={updatedText === comment.text}
                onClick={editCommentHandler}
              >
                Update
              </Button>
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
