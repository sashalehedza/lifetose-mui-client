import React from 'react'
import './modal.css'

import { Box, IconButton } from '@mui/material'

import { TiDeleteOutline } from 'react-icons/ti'

function Modal({ active, setActive, children }) {
  return (
    <Box
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <Box
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              color='error'
              style={{ padding: 0 }}
              onClick={() => setActive(false)}
            >
              <TiDeleteOutline
                style={{ cursor: 'pointer', width: '30px', height: '30px' }}
              />
            </IconButton>
          </Box>
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Modal
