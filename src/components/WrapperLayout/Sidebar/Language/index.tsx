import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'

const Language: NextPage = () => {
  const router = useRouter()

  {
    /*  <div className={styles.languages}>
     <Link href={router.asPath} locale='ru' className={`${router.locale === 'ru' && styles.active}`}>
      RU
    </Link>
  <div className={styles.line} /> */
  }
  {
    /* </div> */
  }
  return (
    <Link href={router.asPath} locale='en' className={`${router.locale === 'en' && styles.active}`}>
      EN
    </Link>
  )
}

export default Language
