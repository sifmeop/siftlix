import { NextPage } from 'next'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IGenres } from 'models/genre.interface'

interface IProps {
  media: string
  genres: IGenres[] | undefined
}

const DiscoveryItem: NextPage<IProps> = ({ media, genres }) => {
  return (
    <div className={styles.genres}>
      {genres?.map((genre) => (
        <Link key={genre.id} className='block' href={`/discovery/${media}/${genre.id}`}>
          <motion.div
            key={genre.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={styles.genre}>
            <motion.h2
              key={genre.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.description}>
              {genre.name[0].toUpperCase() + genre.name.slice(1)}
            </motion.h2>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

export default DiscoveryItem
