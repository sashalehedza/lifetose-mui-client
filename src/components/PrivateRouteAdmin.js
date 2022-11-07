import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const PrivateRouteAdmin = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }))

  return user?.result?.isAdmin ? (
    children
  ) : (
    <Box>You have no permission to visit this page!</Box>
  )
}

export default PrivateRouteAdmin
