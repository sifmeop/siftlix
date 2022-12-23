import { NextPage } from 'next'
import { IoHeart, IoHeartDislike } from 'react-icons/io5'
import { ref, remove, set } from '@firebase/database'
import { db } from '../../../firebase'
import { useAppSelector } from 'hooks/redux'
import { useState } from 'react'
import { message, Tooltip } from 'antd'
import styles from './styles.module.scss'
import { useAuth } from 'hooks/useAuth'
import { IMovieCard } from 'models/movie.interface'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  movie: IMovieCard
}

const MovieFav: NextPage<IProps> = ({ movie }) => {
  const { t: tGlobal } = useTranslation('global')
  const { t: tFavorites } = useTranslation('favorites')
  const [fav, setFav] = useState<IMovieCard>(movie)
  const { isAuth } = useAuth()
  const favorites = useAppSelector((state) => state.favorites.favorites)

  const addToFav = async () => {
    if (!isAuth) {
      message.error(tFavorites('need-login'))
      return
    }
    const reference = ref(db, 'favorites/' + `${localStorage.getItem('uid')!}/` + movie.id)
    try {
      await set(reference, { ...movie }).then(() => {
        message.success(`${tFavorites('added')} ${movie.title ? tGlobal('movie') : tGlobal('tv')} ${movie.title}`)
      })
    } catch (e) {
      console.log(e, 'addToFav DB')
    }
  }

  const removeFromFav = async () => {
    const reference = ref(db, 'favorites/' + `${localStorage.getItem('uid')!}/` + movie.id)
    try {
      await remove(reference).then(() => {
        message.success(`${tFavorites('removed')} ${movie.title ? tGlobal('movie') : tGlobal('tv')} ${movie.title}`)
      })
    } catch (e) {
      console.log(e, 'removeFromFav DB')
    }
  }

  return (
    <>
      {favorites.some((item) => item.id === fav.id) ? (
        <Tooltip title={tFavorites('remove-fav')}>
          <div>
            <IoHeartDislike onClick={removeFromFav} size='1.5rem' className={styles.icon} />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title={tFavorites('add-fav')}>
          <div>
            <IoHeart onClick={addToFav} size='1.5rem' className={styles.icon} />
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default MovieFav
