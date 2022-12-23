import { NextPage } from 'next'
import styles from './styles.module.scss'
import Star from 'assets/images/movieCard/star.svg'
import Link from 'next/link'
import MovieFav from '../MovieFav'
import MovieReview from '../MovieReview'
import { motion } from 'framer-motion'
import Img from '../Img'
import { getYear } from 'utils/getYear'
import { getGenres } from 'utils/getGenres'
import { Tooltip } from 'antd'
import { IMovieCard } from 'models/movie.interface'
import { useGetGenresListQuery } from 'store/api/theMovieDB'
import { useRouter } from 'next/router'
import { getGenre } from 'utils/getGenre'

interface IProps {
  movie: IMovieCard
}

const MovieCard: NextPage<IProps> = ({ movie }) => {
  const router = useRouter()
  const { data } = useGetGenresListQuery({ media: movie.first_air_date ? 'tv' : 'movie', lang: router.locale })

  return (
    <motion.li
      key={movie.id}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className={styles.card}>
      <Link href={`/${movie.first_air_date ? 'tv' : 'movie'}/${movie.id}`}>
        <Img width={500} height={800} poster={movie.poster_path} title={movie.title || movie.name} />
      </Link>
      <motion.h1
        key={movie.title || movie.name}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={styles.title}>
        {movie.title || movie.name}
      </motion.h1>
      <Tooltip placement='topLeft' title={getGenre(movie.genre_ids, data) || getGenres(movie.genres, data)}>
        <motion.span
          key='Genres'
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className={styles.genres}>
          {getYear(movie.release_date || movie.first_air_date)},{' '}
          {getGenre(movie.genre_ids, data) || getGenres(movie.genres, data)}
        </motion.span>
      </Tooltip>
      <motion.div
        className={styles.rating}
        key={movie.vote_average}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 20, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}>
        <Star />
        <p className='font-bold mr-auto'>{movie.vote_average.toFixed(1)}</p>
        <MovieFav movie={movie} />
        <MovieReview movie={movie} />
      </motion.div>
    </motion.li>
  )
}

export default MovieCard
