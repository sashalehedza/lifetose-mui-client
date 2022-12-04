import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByTag } from '../../redux/features/postSlice'

import { Box, Typography, Container, Divider } from '@mui/material'
import Spinner from '../../components/Spinner'
import PostItem from './PostItem'

function TagPosts() {
  const { tagPosts, error } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()

  const { tag } = useParams()

  useEffect(() => {
    if (tag) {
      dispatch(getPostsByTag(tag))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag])

  return (
    <Container>
      {error ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
            height: '100px',
          }}
        >
          <Typography variant='h4'>{error}</Typography>
        </Box>
      ) : (
        <>
          {!tagPosts ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '200px',
              }}
            >
              <Spinner />
            </Box>
          ) : (
            <>
              <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
                Posts with tag: {tag}
              </Divider>
              {tagPosts.length === 0 && (
                <Typography sx={{ marginTop: '20px', marginBottom: '20px' }}>
                  No Posts Found with tag: {tag}
                </Typography>
              )}
              {tagPosts && tagPosts.map((post) => <PostItem post={post} />)}
            </>
          )}
        </>
      )}
    </Container>
  )
}

export default TagPosts
