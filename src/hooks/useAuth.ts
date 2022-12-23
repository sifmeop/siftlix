import { useAppSelector } from './redux'
import { getAuth } from '@firebase/auth'

export const useAuth = () => {
  const auth = getAuth()
  const { id, token, email } = useAppSelector((state) => state.user)

  return {
    isAuth: !!email,
    email,
    token,
    id,
    auth
  }
}
