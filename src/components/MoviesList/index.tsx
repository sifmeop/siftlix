import { NextPage } from 'next'
import MovieCard from '../MovieCard'
import styles from './styles.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import Title from '../Title'
import { IMovieCard } from 'models/movie.interface'

interface IProps {
  title?: string
  data: IMovieCard[] | undefined
}

const MoviesList: NextPage<IProps> = ({ title, data }) => {
  return data ? (
    <div>
      <Title title={title} />
      <motion.ul className={styles.movies}>
        <AnimatePresence>
          {data.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  ) : (
    <h1 className={styles.title}>Error fetch data</h1>
  )
}

export default MoviesList
