import { NextPage } from 'next'
import FormAuth from 'components/FormAuth'

const Login: NextPage = () => {
  return <FormAuth type='Login' analog='Register' />
}

export default Login
