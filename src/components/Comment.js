import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import { FaEdit, FaTrash } from 'react-icons/fa'
import { VscTriangleUp, VscTriangleDown } from 'react-icons/vsc'

import { deleteComment, updateComment } from '../redux/api'
import Spinner from './Spinner'
import { Typography } from '@mui/material'

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
        <span>
          <span>Created At </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.createdAt}</Moment>
        </span>
      )
    } else
      return (
        <span>
          <span>Last Updated </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{comment.updatedAt}</Moment>
        </span>
      )
  }

  return (
    <>
      {comment && (
        <div className='comment'>
          <div className='comment__top'>
            <h2 className='comment__by'>{comment?.commentedBy?.name}</h2>
            <span className='comment__at'>{getCommentAudit()}</span>
          </div>
          {!editComment ? (
            <p className='comment__text'>{comment.text}</p>
          ) : (
            <div className='edit-comment'>
              <input
                type='text'
                className='form__control'
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
            </div>
          )}
          <div>{comment._id}</div>
          <div className='comment__links'>
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
          </div>
        </div>
      )}
    </>
  )
}

export default Comment
