import React, { useState, useEffect } from 'react'
import Moment from 'react-moment'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'

import { getAllReply, reply, updateComment } from '../redux/api'
import Spinner from './Spinner'

const Comment = ({ comment, depth }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedReply, setCollapsedReply] = useState(false)
  const [replies, setReplies] = useState([])
  const [editComment, setEditComment] = useState(false)
  const [data, setData] = useState(null)
  const [updatedText, setUpdatedText] = useState('')

  useEffect(() => {
    setData(comment)
    setUpdatedText(comment.text)
  }, [comment])

  const replyClickHandler = () => {
    setCollapsed(false)
  }

  const editCommentHandler = async () => {
    try {
      const res = await updateComment({ text: updatedText }, data._id)
      setUpdatedText(res.data.text)
      setData(res.data)
      setEditComment(false)
    } catch (err) {}
  }

  const getCommentAudit = () => {
    if (data.createdAt === data.updatedAt) {
      return (
        <span>
          <span>Created At </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{data.createdAt}</Moment>
        </span>
      )
    } else
      return (
        <span>
          <span>Last Updated </span>{' '}
          <Moment format='DD-MM-YYYY HH:mm'>{data.updatedAt}</Moment>
        </span>
      )
  }

  return (
    <>
      {data && (
        <div className='comment'>
          <div className='comment__top'>
            <h2 className='comment__by'>{data?.commentedBy?.name}</h2>
            <span className='comment__at'>{getCommentAudit()}</span>
          </div>
          {!editComment ? (
            <p className='comment__text'>{data.text}</p>
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
                disabled={updatedText === data.text}
                onClick={editCommentHandler}
              >
                Update
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  setEditComment(false)
                  setUpdatedText(data.text)
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className='comment__links'>
            {user?.result?._id === data?.commentedBy?._id && (
              <Button
                variant='contained'
                color='success'
                onClick={() => setEditComment(true)}
              >
                Edit
              </Button>
            )}
            {collapsed ? (
              <Button variant='contained' onClick={replyClickHandler}>
                Open Replies
              </Button>
            ) : (
              <Button
                variant='contained'
                color='warning'
                onClick={() => setCollapsed(true)}
              >
                Hide Replies
              </Button>
            )}
            {user?.result?._id && (
              <Button
                variant='contained'
                color='error'
                onClick={() => setCollapsedReply(!collapsedReply)}
              >
                Reply
              </Button>
            )}
          </div>
        </div>
      )}
      <ReplyToComment
        commentId={data?._id}
        setReplies={setReplies}
        collapsedReply={collapsedReply}
        setCollapsedReply={setCollapsedReply}
        setCollapsed={setCollapsed}
      />
      {!collapsed && (
        <div style={{ marginLeft: `${depth * 2}rem` }}>
          <Replies
            commentId={data?._id}
            loggedInUser={!!user?.result?._id}
            depth={depth}
            replies={replies}
            setReplies={setReplies}
          />
        </div>
      )}
    </>
  )
}

const ReplyToComment = ({
  commentId,
  setReplies,
  collapsedReply,
  setCollapsedReply,
  setCollapsed,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const [text, setText] = useState('')

  const replyClickHandler = async () => {
    try {
      const res = await reply({ text }, commentId)
      setReplies((prevReplies) => [res.data, ...prevReplies])
      setCollapsedReply(!collapsedReply)
      setCollapsed(false)
    } catch (err) {}
  }
  return (
    <div>
      {user?.result?._id && collapsedReply ? (
        <div className='reply'>
          <input
            type='text'
            className='form__control'
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className='btn reply__btn'
            disabled={!text}
            onClick={replyClickHandler}
          >
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

const Replies = ({ commentId, loggedInUser, depth, replies, setReplies }) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAllReplies = async () => {
      try {
        const res = await getAllReply(commentId)
        setLoading(false)
        setReplies(res.data)
      } catch (err) {
        setLoading(false)
      }
    }

    if (commentId) fetchAllReplies()
  }, [commentId, setReplies])
  return (
    <ul className='comments__list'>
      {!loading ? (
        replies.map((comment) => (
          <li key={comment._id} className='comments__item'>
            <Comment
              comment={comment.replyComment}
              loggedInUser={loggedInUser}
              depth={depth + 1}
            />
          </li>
        ))
      ) : (
        <Spinner />
      )}
    </ul>
  )
}

export default Comment
