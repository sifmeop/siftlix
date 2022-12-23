import { NextPage } from 'next'
import Link from 'next/link'
import styles from './styles.module.scss'
import LogoIcon from 'assets/images/sidebar/logo.svg'

const Logo: NextPage = () => {
  return (
    <Link href='/' className={styles.logo}>
      <LogoIcon />
      Siftlix
    </Link>
  )
}

export default Logo
