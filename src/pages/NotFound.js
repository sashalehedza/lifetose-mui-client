import { Box } from '@mui/material'
import React from 'react'

function NotFound() {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img src='/images/404.png' alt='Not Found' />
    </Box>
  )
}

export default NotFound
