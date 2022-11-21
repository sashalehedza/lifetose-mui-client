import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivateRouteAdmin = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))
  return user?.result?.isAdmin ? (
    children
  ) : (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '20px',
      }}
    >
      <Typography variant='h5'>
        You have no permission to visit this page!
      </Typography>
    </Box>
  )
}

export default PrivateRouteAdmin
