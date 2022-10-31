import { TextField } from '@mui/material'
import { useField } from 'formik'

const InputField = ({ name, placeholder, label, type }) => {
  const [inputProps, { touched, error }] = useField(name)

  return (
    <TextField
      {...inputProps}
      autoComplete='off'
      placeholder={placeholder}
      type={type}
      label={label ? label : null}
      error={touched && Boolean(error)}
      helperText={touched && error}
      variant='outlined'
      fullWidth
      sx={{ mt: 1, mb: 1 }}
    />
  )
}

export default InputField
