import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { createComment } from '../redux/api'
import { useSelector } from 'react-redux'
import { Box, Button, TextareaAutosize } from '@mui/material'

const AddComment = ({ setComments }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { id } = useParams()
  const [text, setText] = useState('')

  const addCommentHandler = async () => {
    try {
      const res = await createComment(id, { text })
      setComments((prevComments) => [res.data, ...prevComments])
      setText('')
    } catch (err) {}
  }
  return (
    <Box sx={{ width: '100%', m: 0, p: 2 }}>
      {user?.result?._id ? (
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
      ) : (
        <Box>To comment you need to be logged in!</Box>
      )}
    </Box>
  )
}

export default AddComment
