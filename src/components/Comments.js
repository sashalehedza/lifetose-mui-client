import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Comment from './Comment'
import AddComment from './AddComment'
import { getPostComments } from '../redux/api'

import Spinner from './Spinner'

import { Box } from '@mui/system'
import { List, ListItem, Paper } from '@mui/material'

const Comments = () => {
  const { id } = useParams()
  const [comments, setComments] = useState(null)

  useEffect(() => {
    async function fetchAllComments() {
      try {
        const res = await getPostComments(id)
        setComments(res.data)
      } catch (err) {}
    }
    fetchAllComments()
  }, [id])

  return (
    <>
      <Paper sx={{ mt: 2, p: 0 }}>
        <AddComment setComments={setComments} />
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
          {!comments ? (
            <Spinner />
          ) : (
            <>
              {comments.length !== 0 ? (
                <List sx={{ mt: 0, pt: 0 }}>
                  {comments.map((comment) => (
                    <ListItem sx={{ mb: 0 }} key={comment._id}>
                      <Comment
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box>No comments here yet</Box>
              )}
            </>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default Comments
