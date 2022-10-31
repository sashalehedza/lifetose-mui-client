import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/authSlice'
import RoutesBase from './RoutesBase'

function App() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    dispatch(setUser(user))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <RoutesBase />
}

export default App
