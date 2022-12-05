import { Box } from '@mui/material'
import React from 'react'
import Header from './Header'

function Layout({ children }) {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Box sx={{ height: '50px' }}></Box>
    </>
  )
}

export default Layout
