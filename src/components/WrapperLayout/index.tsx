import { NextPage } from 'next'
import { PropsWithChildren, useEffect, useState } from 'react'
import Footer from './Footer'
import styles from './styles.module.scss'
import Header from './Header'
import Sidebar from './Sidebar'
import { useAuth } from 'hooks/useAuth'
import Main from 'components/WrapperLayout/Main'
import { useFavorite } from 'hooks/useFavorite'
import { useReviews } from 'hooks/useReviews'
import { useAutoAuth } from 'hooks/useAutoAuth'
import Loader from '../UI/Loader'

const WrapperLayout: NextPage<PropsWithChildren> = ({ children }) => {
  const { auth } = useAuth()
  const [open, setOpen] = useState<boolean>(false)

  const loader = useAutoAuth()

  useFavorite()
  useReviews()

  useEffect(() => {
    console.log(auth.currentUser)
  }, [auth.currentUser])

  return loader ? (
    <Loader />
  ) : (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <div className={styles.content}>
        <Header open={open} setOpen={setOpen} />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  )
}

export default WrapperLayout
