import React, { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

const RateStatic = ({ count, rating, color }) => {
  const getColor = (index) => {
    return rating >= index
      ? color.filled
      : rating >= index - 0.5
      ? color.filled
      : color.unfilled
  }

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className='cursor-pointer'
          icon={
            rating >= idx ? faStar : rating >= idx - 0.5 ? faStarHalf : faStar
          }
          style={{ color: getColor(idx) }}
        />
      ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, rating])

  return <>{starRating}</>
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
