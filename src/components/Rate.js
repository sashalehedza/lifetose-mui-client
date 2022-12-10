import React, { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Box } from '@mui/material'

const Rate = ({ count, rating, color, onRating }) => {
  const [hoverRating, setHoverRating] = useState(0)

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled
    } else if (!hoverRating && rating >= index) {
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
          onClick={() => onRating(idx)}
          style={{ color: getColor(idx) }}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating, hoverRating])

  return <Box>{starRating}</Box>
}

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: 'red',
    unfilled: '#DCDCDC',
  },
}

export default Rate
