import { NextPage } from 'next'
import styles from './styles.module.scss'

const MiniLoader: NextPage = () => {
  return (
    <div className={styles.ldsEllipsis}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default MiniLoader
