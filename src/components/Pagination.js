import { Button } from '@mui/material'
import Box from '@mui/material/Box'

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit)

  const onClick = (newPage) => {
    setPage(newPage + 1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      {totalPages > 1 &&
        [...Array(totalPages)].map((val, index) => (
          <Button
            variant='contained'
            onClick={() => onClick(index)}
            color={page === index + 1 ? 'success' : 'primary'}
            key={index}
          >
            {index + 1}
          </Button>
        ))}
    </Box>
  )
}

export default Pagination
