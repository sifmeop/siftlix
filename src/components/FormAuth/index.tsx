import { NextPage } from 'next'
import Meta from 'utils/Meta'
import AlternativeAuth from './AlternativeAuth'
import FormAuth from './Form'
import { IAuthPage } from 'models/authPage.interface'
import Link from 'next/link'
import styles from './styles.module.scss'
import Logo from 'assets/images/form/logoBig.svg'
import { useAuth } from 'hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

const AuthPage: NextPage<IAuthPage> = ({ type, analog }) => {
  const { t } = useTranslation('authForm')
  const { isAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push('/')
    }
  }, [isAuth])

  return (
    <>
      <Meta title={t(type)} description={`Here you can ${type.toLowerCase()}`} />
      <Logo className='mx-auto mb-2' />
      <p className='text-center font-bold text-2xl mb-5'>{type === 'Login' ? t('greet-login') : t('greet-register')}</p>
      <div className={styles.wrapper}>
        <FormAuth type={type} analog={analog} />
        <AlternativeAuth />
        <p className='text-center'>
          {type === 'Register' ? t('have-account') : t('dont-have-account')}{' '}
          <Link href={`/${analog.toLowerCase()}`} className={styles.link}>
            {t(analog.toLowerCase())}
          </Link>
        </p>
      </div>
    </>
  )
}

export default AuthPage
