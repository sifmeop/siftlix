import { NextPage } from 'next'
import { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

const Main: NextPage<PropsWithChildren<unknown>> = ({ children }) => {
  return <main className={styles.main}>{children}</main>
}

export default Main
