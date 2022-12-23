import { NextPage } from 'next'
import styles from './styles.module.scss'
import { getGenres } from 'utils/getGenres'
import { motion } from 'framer-motion'
import { useGetGenresListQuery, useGetVideoQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import Trailer from 'components/Trailer'
import Overview from 'components/Overview'
import Recommendations from 'components/Recommendations'
import Actors from 'components/Actors'
import TableInfo from 'components/TableInfo'
import { ITableInfo } from 'models/tableInfo.interface'
import { handlerData } from 'utils/handlerData'
import { IDetails } from 'models/details.interface'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  tv: IDetails
}

const TVId: NextPage<IProps> = ({ tv }) => {
  const { t } = useTranslation('movie-page')
  const router = useRouter()
  const { data: genresList } = useGetGenresListQuery({
    media: tv.first_air_date ? 'tv' : 'movie',
    lang: router.locale
  })
  const { data, isLoading, error } = useGetVideoQuery({ media: 'tv', id: tv.id.toString() })

  const tvInfoTable: ITableInfo[] = [
    { title: t('rating'), description: `${tv.vote_average.toFixed(1)} (${tv.vote_count} ${t('votes')})` },
    { title: t('tagline'), description: tv.tagline || '-' },
    { title: t('country'), description: tv.origin_country.map((country) => country).join(', ') },
    { title: t('creator'), description: tv.created_by.map((creator) => creator.name).join(', ') || '-' },
    { title: t('genre'), description: getGenres(tv.genres, genresList) || '-' },
    { title: t('release'), description: handlerData(tv.first_air_date) },
    { title: t('last-episode'), description: handlerData(tv.last_episode_to_air.air_date) },
    { title: t('next-episode'), description: handlerData(tv.next_episode_to_air?.air_date) || '-' },
    { title: t('status'), description: tv.status },
    { title: t('seasons'), description: tv.seasons.length },
    { title: t('series'), description: tv.seasons.reduce((acc, series) => series.episode_count + acc, 0) },
    { title: t('duration'), description: tv.episode_run_time[0] || '-' }
  ]

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'Error Video')
  }

  return (
    <div className={styles.tv}>
      <motion.h1
        key={tv.name}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={styles.title}>
        {tv.name}
      </motion.h1>
      <TableInfo data={tv} tableInfo={tvInfoTable} />
      <Overview title={tv.name} overview={tv.overview} />
      <Trailer data={data} />
      <Actors media='tv' id={tv.id.toString()} />
      <Recommendations media='tv' id={tv.id.toString()} />
    </div>
  )
}

export default TVId
