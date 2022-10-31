import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createComment } from '../redux/api'
import { useSelector } from 'react-redux'

const AddComment = ({ setComments }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { id } = useParams()
  const [text, setText] = useState('')

  const addCommentHandler = async () => {
    try {
      const res = await createComment(id, { text })
      setComments((prevComments) => [res.data, ...prevComments])
    } catch (err) {}
  }
  return (
    <div className='paper addcomment__paper'>
      {user?.result?._id ? (
        <div className='addcomment'>
          <label htmlFor='addComment' className='addcomment__label'>
            Add Comment
          </label>
          <textarea
            id='addComment'
            className='addcomment__control'
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='btn addcomment__btn'
            disabled={!text}
            onClick={addCommentHandler}
          >
            Add Comment
          </button>
        </div>
      ) : (
        <div>To comment you need to be logged in!</div>
      )}
    </div>
  )
}

export default AddComment
