import React from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/features/authSlice'

import decode from 'jwt-decode'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { clearCart } from '../redux/features/postSlice'

import LIFETOSE from '../images/LIFETOSE.PNG'

function Header() {
  const { user } = useSelector((state) => ({ ...state.auth }))
  const { cart } = useSelector((state) => ({ ...state.post }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = user?.token

  if (token) {
    const decodedToken = decode(token)
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout())
    }
  }

  const navigateToHome = (e) => {
    e.preventDefault()
    navigate('/')
  }

  const handleLogout = () => {
    dispatch(setLogout())
    dispatch(clearCart())
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const cartElementsCount = cart.reduce((price, product) => {
    return price + product.count
  }, 0)

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            onClick={navigateToHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            LIFETOSE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {!user?.result?._id && (
                <Box>
                  <Typography textAlign='center' sx={{ padding: '16px' }}>
                    You are not logged in! To log in or register click one of
                    options bellow.
                  </Typography>
                  <Box
                    sx={{
                      // flexGrow: 1,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant='contained'
                      color='grey'
                      onClick={handleCloseNavMenu}
                      style={{ margin: '10px' }}
                    >
                      <Link
                        to='/login'
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        <Typography textAlign='center'>Log in</Typography>
                      </Link>
                    </Button>
                    <Button
                      variant='contained'
                      color='purple'
                      onClick={handleCloseNavMenu}
                      style={{ margin: '10px' }}
                    >
                      <Link
                        to='/register'
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        <Typography textAlign='center'>Register</Typography>
                      </Link>
                    </Button>
                  </Box>
                  {cartElementsCount ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '20px',
                      }}
                      onClick={handleCloseNavMenu}
                    >
                      <Link
                        to='/cart'
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        <Badge
                          badgeContent={cartElementsCount}
                          color='secondary'
                        >
                          <ShoppingCartIcon
                            sx={{ width: '23px', height: '23px' }}
                            color='action'
                          />
                        </Badge>
                      </Link>
                    </Box>
                  ) : null}
                </Box>
              )}
              {user?.result?._id && (
                <Box>
                  <Typography textAlign='center'>
                    Logged in as: {user?.result?.name}
                  </Typography>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={handleCloseNavMenu}
                    style={{ margin: '10px' }}
                  >
                    <Link
                      to='/my-orders'
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      <Typography textAlign='center'>My Orders</Typography>
                    </Link>
                  </Button>
                </Box>
              )}
              {user?.result?._id && user?.result?.isAdmin && (
                <Box>
                  <Typography textAlign='center'>Admin Panel</Typography>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Button
                        variant='contained'
                        color='error'
                        onClick={handleCloseNavMenu}
                        style={{ margin: '10px' }}
                      >
                        <Link
                          to='/orders'
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Typography textAlign='center'>Orders</Typography>
                        </Link>
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={handleCloseNavMenu}
                        style={{ margin: '10px' }}
                      >
                        <Link
                          to='/coupons'
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Typography textAlign='center'>Coupons</Typography>
                        </Link>
                      </Button>
                      <Button
                        variant='contained'
                        color='purple'
                        onClick={handleCloseNavMenu}
                        style={{ margin: '10px' }}
                      >
                        <Link
                          to='/addCoupon'
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Typography textAlign='center'>Add Coupon</Typography>
                        </Link>
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <Button
                        variant='contained'
                        color='purple'
                        onClick={handleCloseNavMenu}
                        style={{ margin: '10px' }}
                      >
                        <Link
                          to='/addPost'
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Typography textAlign='center'>Add Post</Typography>
                        </Link>
                      </Button>
                      <Button
                        variant='contained'
                        color='success'
                        onClick={handleCloseNavMenu}
                        style={{ margin: '10px' }}
                      >
                        <Link
                          to='/dashboard'
                          style={{ color: 'white', textDecoration: 'none' }}
                        >
                          <Typography textAlign='center'>Dashboard</Typography>
                        </Link>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              )}
              {user?.result?._id && cartElementsCount ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px',
                  }}
                  onClick={handleCloseNavMenu}
                >
                  <Link
                    to='/cart'
                    style={{ color: 'white', textDecoration: 'none' }}
                  >
                    <Badge badgeContent={cartElementsCount} color='secondary'>
                      <ShoppingCartIcon
                        sx={{ width: '23px', height: '23px' }}
                        color='action'
                      />
                    </Badge>
                  </Link>
                </Box>
              ) : null}
            </Menu>
          </Box>
          <Typography
            variant='h5'
            noWrap
            onClick={navigateToHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            LIFETOSE
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            {!user?.result?._id && cartElementsCount ? (
              <Link
                to='/cart'
                style={{ color: 'white', textDecoration: 'none' }}
              >
                <Badge badgeContent={cartElementsCount} color='secondary'>
                  <ShoppingCartIcon
                    sx={{ width: '23px', height: '23px' }}
                    color='action'
                  />
                </Badge>
              </Link>
            ) : null}
            {user?.result?._id && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Logged in as: {user?.result?.name}
              </Button>
            )}
            {user?.result?._id && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  to='/my-orders'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  My Orders
                </Link>
              </Button>
            )}
            {user?.result?._id && user?.result?.isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link
                  to='/addPost'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Add Post
                </Link>
              </Button>
            )}
            {user?.result?._id && user?.result?.isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to='/dashboard'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Dashboard
                </Link>
              </Button>
            )}
            {user?.result?._id && user?.result?.isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to='/orders'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Orders
                </Link>
              </Button>
            )}
            {user?.result?._id && user?.result?.isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to='/coupons'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Coupons
                </Link>
              </Button>
            )}
            {user?.result?._id && user?.result?.isAdmin && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to='/addCoupon'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Add Coupon
                </Link>
              </Button>
            )}
            {user?.result?._id && cartElementsCount ? (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
              >
                <Link
                  to='/cart'
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  <Badge badgeContent={cartElementsCount} color='secondary'>
                    <ShoppingCartIcon
                      sx={{ width: '23px', height: '23px' }}
                      color='action'
                    />
                  </Badge>
                </Link>
              </Button>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {user?.result?._id ? (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='LIFETOSE' src={LIFETOSE} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link
                      to='/login'
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      <Typography
                        textAlign='center'
                        onClick={() => handleLogout()}
                      >
                        Log Out
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='LIFETOSE' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link
                      to='/login'
                      style={{
                        color: 'black',
                        textDecoration: 'none',
                      }}
                    >
                      <Typography
                        textAlign='center'
                        onClick={handleCloseUserMenu}
                      >
                        Log in
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to='/register'
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      <Typography
                        textAlign='center'
                        onClick={handleCloseUserMenu}
                      >
                        Register
                      </Typography>
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
