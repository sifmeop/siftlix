import { NextPage } from 'next'
import styles from './styles.module.scss'

const Loader: NextPage = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loader
