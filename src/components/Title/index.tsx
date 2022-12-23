import { NextPage } from 'next'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

interface IProps {
  title: string | undefined
}

const Title: NextPage<IProps> = ({ title }) => {
  return (
    <motion.h1
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ type: 'spring' }}
      key={title}
      className={styles.title}>
      {title}
    </motion.h1>
  )
}

export default Title
