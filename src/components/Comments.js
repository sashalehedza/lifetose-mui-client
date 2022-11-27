import React from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import Spinner from './Spinner'

import { Box } from '@mui/system'
import { List, ListItem, Paper, Typography } from '@mui/material'

const Comments = ({ comments }) => {
  return (
    <>
      <Paper sx={{ mt: 2, p: 0 }}>
        <AddComment comments={comments} />
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
          {!comments ? (
            <Spinner />
          ) : (
            <>
              {comments.length !== 0 ? (
                <List sx={{ mt: 0, pt: 0 }}>
                  {comments.map((comment) => (
                    <ListItem sx={{ mb: 0 }} key={comment._id}>
                      <Comment comment={comment} key={comment._id} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant='h6'> No comments here yet.</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Paper>
    </>
  )
}

export default Comments
