import { useEffect } from 'react'
import { onValue, ref } from '@firebase/database'
import { db } from '../../firebase'
import { useAuth } from './useAuth'
import { useAppDispatch } from './redux'
import { addReviews } from 'store/slices/reviewsSlice'

export const useReviews = () => {
  const { isAuth } = useAuth()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      const reviewsRef = ref(db, 'reviews/' + `${localStorage.getItem('uid')!}/`)
      return onValue(reviewsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          dispatch(addReviews(Object.values(data)))
        } else {
          dispatch(addReviews([]))
        }
      })
    }
  }, [isAuth, dispatch])
}
