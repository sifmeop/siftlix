import { NextPage } from 'next'
import styles from './styles.module.scss'
import { useGetGenresListQuery, useGetVideoQuery } from 'store/api/theMovieDB'
import Loader from 'components/UI/Loader'
import { motion } from 'framer-motion'
import { getGenres } from 'utils/getGenres'
import { ITableInfo } from 'models/tableInfo.interface'
import Overview from 'components/Overview'
import Trailer from 'components/Trailer'
import Recommendations from 'components/Recommendations'
import Actors from 'components/Actors'
import TableInfo from 'components/TableInfo'
import { handlerData } from 'utils/handlerData'
import { IDetails } from 'models/details.interface'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  movie: IDetails
}

const MovieID: NextPage<IProps> = ({ movie }) => {
  const { t } = useTranslation('movie-page')
  const router = useRouter()
  const { data: genresList } = useGetGenresListQuery({
    media: movie.first_air_date ? 'tv' : 'movie',
    lang: router.locale
  })
  const { data, isLoading, error } = useGetVideoQuery({ media: 'movie', id: movie.id.toString() })

  const movieTableInfo: ITableInfo[] = [
    { title: t('rating'), description: `${movie.vote_average.toFixed(1)} (${movie.vote_count} ${t('votes')})` },
    { title: t('tagline'), description: movie.tagline || '-' },
    { title: t('genre'), description: getGenres(movie.genres, genresList) },
    { title: t('release'), description: handlerData(movie.release_date) },
    { title: t('time'), description: movie.runtime + ` ${t('min')}` || '-' },
    { title: t('status'), description: movie.status }
  ]

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    console.log(error, 'Error Video')
  }

  return (
    <div className={styles.movie}>
      <motion.h1
        key={movie.title}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={styles.title}>
        {movie.title}
      </motion.h1>
      <TableInfo data={movie} tableInfo={movieTableInfo} />
      <Overview title={movie.title} overview={movie.overview} />
      <Trailer data={data} />
      <Actors media='movie' id={movie.id.toString()} />
      <Recommendations media='movie' id={movie.id.toString()} />
    </div>
  )
}

export default MovieID
