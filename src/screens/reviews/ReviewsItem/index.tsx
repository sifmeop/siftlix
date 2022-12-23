import { NextPage } from 'next'
import styles from './styles.module.scss'
import { MOVIE_IMAGE_URL } from 'utils/constants'
import Star from 'assets/images/movieCard/star.svg'
import MovieFav from 'components/MovieFav'
import MovieReview from 'components/MovieReview'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Img from 'components/Img'
import { IMovieCard } from 'models/movie.interface'
import { useRouter } from 'next/router'
import { useGetGenresListQuery } from 'store/api/theMovieDB'
import { getGenre } from 'utils/getGenre'
import { getGenres } from 'utils/getGenres'

interface IProps {
  review: IMovieCard
  index: number
}

const ReviewsItem: NextPage<IProps> = ({ review, index }) => {
  const router = useRouter()
  const { data } = useGetGenresListQuery({ media: review.first_air_date ? 'tv' : 'movie', lang: router.locale })

  return (
    <motion.li
      key={review.title || review.name}
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: 'spring', duration: 0.5 }}
      className={styles.list}>
      <div className={styles.review}>
        <div className={styles.content}>
          <motion.div
            key='control'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className='absolute top-3 right-3 flex items-center gap-2 bg-white p-1.5 rounded-lg z-10'>
            <MovieFav movie={review} />
            <MovieReview movie={review} />
          </motion.div>
          <motion.div
            key='hero'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className={styles.reviewHeader}>
            <Link className='block' href={`/movie/${review.id}`}>
              <Img
                height={200}
                width={150}
                poster={`${MOVIE_IMAGE_URL}/${review.poster_path}`}
                title={review.title || review.name}
              />
            </Link>
            <div>
              <div>
                <h1>
                  {index + 1}. <b className='font-semibold text-lg'>{review.title || review.name}</b>
                </h1>
              </div>
              <p className='text-sm mb-1'>
                {review.release_date?.split('-')[0] || review.first_air_date?.split('-')[0]} |{' '}
                {getGenre(review.genre_ids, data) || getGenres(review.genres, data)}
              </p>
              <div className={styles.rating}>
                <Star />
                <p>{review.vote_average.toFixed(1)}</p>
                |
                <Star className={styles.myRate} />
                <p>{review.rate}</p>
              </div>
              <p className='font-thin text-sm mb-3'>Votes: {review.vote_count}</p>
            </div>
          </motion.div>
          <motion.p
            key={review.overview}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}>
            {review.overview}
          </motion.p>
        </div>
        <div
          className={styles.bg}
          style={{
            backgroundImage: `url(${MOVIE_IMAGE_URL}/${review.backdrop_path})`
          }}
        />
      </div>
      <motion.div
        key={review.desc}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}>
        <span className='font-medium'>Review:</span>
        <p className='italic'>{review.desc}</p>
      </motion.div>
    </motion.li>
  )
}

export default ReviewsItem
