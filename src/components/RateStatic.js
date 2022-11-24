import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@mui/material'

const RateStatic = ({ count, rating, color }) => {
  const getColor = (index) => {
    if (rating >= index) {
      return color.filled
    }

    return color.unfilled
  }

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className='cursor-pointer'
          icon={faStar}
          style={{ color: getColor(idx) }}
        />
      ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating])

  return <Box>{starRating}</Box>
}

RateStatic.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: 'red',
    unfilled: '#DCDCDC',
  },
}

export default RateStatic
