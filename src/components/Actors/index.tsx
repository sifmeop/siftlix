import { NextPage } from 'next'
import styles from './styles.module.scss'
import { useGetCreditsQuery } from 'store/api/theMovieDB'
import ActorItem from './ActorItem'
import Loader from 'components/UI/Loader'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  id: string
  media: string
}

const Actors: NextPage<IProps> = ({ media, id }) => {
  const { t } = useTranslation('movie-page')
  const [showMore, setShowMore] = useState<number>(4)
  const { data, isLoading, error } = useGetCreditsQuery({ media, id })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'ERROR ACTORS')
  }

  return (
    <div className={styles.actors}>
      <h1 className={styles.title}>{t('actors')}</h1>
      <ul className={styles.list}>
        <AnimatePresence>
          {data?.slice(0, showMore).map((person) => (
            <ActorItem key={person.name} person={person} />
          ))}
        </AnimatePresence>
      </ul>
      {data?.length && showMore === 4 && (
        <button className={styles.showMore} onClick={() => setShowMore(10)}>
          {t('show-more')}
        </button>
      )}
    </div>
  )
}

export default Actors
