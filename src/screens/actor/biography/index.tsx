import { NextPage } from 'next'
import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation'

interface IProps {
  biography: string
}

const Biography: NextPage<IProps> = ({ biography }) => {
  const { t } = useTranslation('actor')
  return (
    <div>
      <h2 className={styles.title}>{t('biography')}</h2>
      <p className={styles.biography}>{biography}</p>
    </div>
  )
}

export default Biography
