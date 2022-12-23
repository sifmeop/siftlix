import { useEffect, useState } from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { useAuth } from './useAuth'
import { setUser } from '../store/slices/userSlice'
import { useAppDispatch } from './redux'

export const useAutoAuth = () => {
  const { auth } = useAuth()
  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user?.getIdToken().then((token) => {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email,
            token
          })
        )
        localStorage.setItem('token', token)
      })
    })
    setLoader(false)
    return () => {
      unsubscribe()
    }
  }, [auth, dispatch])

  return loader
}
