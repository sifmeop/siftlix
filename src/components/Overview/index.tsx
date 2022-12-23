import { NextPage } from 'next'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  title: string
  overview: string
}

const Overview: NextPage<IProps> = ({ title, overview }) => {
  const { t } = useTranslation('movie-page')
  return (
    <div className='mb-5'>
      <motion.h2
        key='about movie'
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className={styles.title}>
        {t('what-about')} «{title}»:
      </motion.h2>
      <motion.p
        key={overview}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}>
        {overview}
      </motion.p>
    </div>
  )
}

export default Overview
