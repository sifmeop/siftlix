import { NextPage } from 'next'
import styles from './styles.module.scss'
import ReviewsItem from '../ReviewsItem'
import Title from 'components/Title'
import { AnimatePresence, motion } from 'framer-motion'
import { IMovieCard } from 'models/movie.interface'

interface IProps {
  data: IMovieCard[]
  title: string
}

const ReviewsList: NextPage<IProps> = ({ title, data }) => {
  return (
    <div className={styles.reviews}>
      <Title title={title} />
      <motion.ul>
        <AnimatePresence>
          {data.map((review, index) => (
            <ReviewsItem key={review.id} review={review} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}

export default ReviewsList
