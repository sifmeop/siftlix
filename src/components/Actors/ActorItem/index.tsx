import { NextPage } from 'next'
import Image from 'next/image'
import { MOVIE_IMAGE_URL } from 'utils/constants'
import styles from './styles.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  person: any
}

const ActorItem: NextPage<IProps> = ({ person }) => {
  const { t } = useTranslation('movie-page')
  return (
    <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.actor}>
      <Image width={200} height={300} src={`${MOVIE_IMAGE_URL}${person.profile_path}`} alt={person.name} />
      <div>
        <h1 className={styles.name}>{person.name}</h1>
        <h2 className={styles.character}>
          {t('role')}: {person.character}
        </h2>
        <Link className={styles.about} href={`/actor/${person.id}`}>
          {t('about-actor')}
        </Link>
      </div>
    </motion.li>
  )
}

export default ActorItem
