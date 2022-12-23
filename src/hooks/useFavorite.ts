import { useEffect } from 'react'
import { onValue, ref } from '@firebase/database'
import { db } from '../../firebase'
import { addFavorite } from 'store/slices/favoritesSlice'
import { useAuth } from './useAuth'
import { useAppDispatch } from './redux'

export const useFavorite = () => {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      const favoritesRef = ref(db, 'favorites/' + `${localStorage.getItem('uid')!}/`)
      return onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          dispatch(addFavorite(Object.values(data)))
        } else {
          dispatch(addFavorite([]))
        }
      })
    }
  }, [isAuth, dispatch])
}
