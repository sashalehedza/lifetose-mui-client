import React, { useState, useEffect } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'
import { getPostComments } from '../redux/api'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'
import { Box } from '@mui/system'

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
      <div className='main-content'>
        <AddComment setComments={setComments} />
        <div className='paper'>
          {!comments ? (
            <Spinner />
          ) : (
            <>
              {comments.length !== 0 ? (
                <ul className='comments__list'>
                  {comments.map((comment) => (
                    <li className='comments__item' key={comment._id}>
                      <Comment comment={comment} depth={1} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Box>No comments here yet</Box>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
