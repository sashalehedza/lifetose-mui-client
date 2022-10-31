import { createTheme } from '@mui/material/styles'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } })

const theme = createTheme({
  palette: {
    grey: createColor('#999999'),
    purple: createColor('#884dff'),
  },
})

export default theme
