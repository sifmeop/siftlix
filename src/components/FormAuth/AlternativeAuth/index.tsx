import { NextPage } from 'next'
import styles from './styles.module.scss'
import { GoogleOutlined } from '@ant-design/icons'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { setUser } from 'store/slices/userSlice'
import { useAuth } from 'hooks/useAuth'
import { useAppDispatch } from 'hooks/redux'
import { message } from 'antd'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const AlternativeAuth: NextPage = () => {
  const { t } = useTranslation('authForm')
  const { t: tGlobal } = useTranslation('global')
  const router = useRouter()
  const { auth } = useAuth()
  const dispatch = useAppDispatch()
  const googleProvider = new GoogleAuthProvider()

  const signInGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        localStorage.setItem('googleToken', credential?.accessToken!)
        const user = result.user
        console.log(user)
        user.getIdToken().then((token) => {
          dispatch(
            setUser({
              id: user.uid,
              email: user.email,
              token
            })
          )
          message.success(tGlobal('successful-login'))
          localStorage.setItem('uid', user.uid)
        })
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
        message.error(tGlobal('failed-login'))
        console.log(GoogleAuthProvider.credentialFromError(error))
      })
  }

  return (
    <>
      <div className={styles.wrapper}>
        <hr className={styles.hr} />
        <div className={styles.or}>{t('or')}</div>
        <hr className={styles.hr} />
      </div>
      <div className={styles.choiceAuth}>
        <button className={styles.button} onClick={signInGoogle}>
          <GoogleOutlined className={styles.icon} />
        </button>
      </div>
    </>
  )
}

export default AlternativeAuth
