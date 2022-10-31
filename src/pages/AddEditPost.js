import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/features/postSlice'
import { getPost } from '../redux/api'

import Spinner from '../components/Spinner'

import { Box, Button, Container, Divider, TextField } from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete'
import Chip from '@mui/material/Chip'

import FileBase from 'react-file-base64'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import InputField from '../components/InputField'

import DefaultFilmImage from '../images/default_film_image.jpeg'

const validationSchema = yup.object({
  title: yup
    .string('Enter title')
    .min(1, 'Title should be of minimum 1 characters length')
    .required('Title is required'),
  description: yup
    .string('Enter description')
    .min(1, 'Description should be of minimum 1 characters length')
    .required('Description is required'),
  price: yup.number().min(0).required('Price is required'),
})

function AddEditPost() {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [post, setPost] = useState({
    title: '',
    description: '',
    price: 0,
  })
  const [receivers, setReceivers] = useState([])
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        const post = await getPost(id)
        setPost(post.data)
        setReceivers(post.data.tags)
        setFile(post.data.imageFile)
        setLoading(false)
      }
      fetchPost()
    }
    if (!id) {
      setPost({
        title: '',
        description: '',
        price: 0,
      })
      setReceivers([])
      setFile(DefaultFilmImage)
      setLoading(false)
    }
  }, [id])

  return (
    <Container>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
        {id ? 'Edit' : 'Add'} Post
      </Divider>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              width: '240px',
              marginTop: 6,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Formik
              initialValues={post}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={(values) => {
                let { title, description } = values
                if (!receivers.length) {
                  window.alert('Please provide some tags')
                }
                if (title && description && receivers.length) {
                  values.tags = receivers
                  values.imageFile = file
                  const updatedPostData = {
                    ...values,
                    name: user?.result?.name,
                  }
                  if (!id) {
                    dispatch(createPost({ updatedPostData, navigate }))
                  } else {
                    dispatch(updatePost({ id, updatedPostData, navigate }))
                  }
                }
              }}
            >
              <Form>
                <InputField
                  name='title'
                  placeholder='Enter your title'
                  label='title'
                />
                <InputField
                  name='description'
                  placeholder='Enter your description'
                  label='description'
                />
                <InputField
                  name='price'
                  placeholder='Enter your price'
                  label='price'
                />
                <Autocomplete
                  onChange={(e, value) => setReceivers((state) => value)}
                  multiple
                  sx={{ mt: 1, mb: 1 }}
                  id='tags-filled'
                  options={[]}
                  value={receivers || []}
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant='outlined'
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='filled'
                      label='Enter your tags'
                      placeholder='Tags'
                    />
                  )}
                />
                <Box sx={{ width: '240px', mt: 1, mb: 1 }}>
                  <FileBase
                    type='file'
                    multiple={false}
                    onDone={({ base64 }) => setFile(base64)}
                  />
                </Box>
                <Box>
                  <Button
                    variant='contained'
                    type='submit'
                    sx={{ mt: 1, mb: 1 }}
                    fullWidth
                  >
                    {id ? 'Edit' : 'Add'}
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        )}
      </Container>
    </Container>
  )
}

export default AddEditPost
